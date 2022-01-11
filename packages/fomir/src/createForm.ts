import isEqual from 'react-fast-compare'
import isPromise from 'is-promise'
import cloneDeep from 'lodash.clonedeep'
import { getIn, setIn } from 'fomir-utils'
import { isFormValid } from './isFormValid'
import { FieldNode } from './types/field'
import { FormNode } from './types/form'
// import { Node } from './types/node'
import { FormSchema, FieldValidateOptions } from './types/types'
import { NodeOptions, SetNodeFunction } from './types/types'
import { Fomir } from './Fomir'

// type Path =
//   | 'values'
//   | 'errors'
//   | 'dirty'
//   | 'valid'
//   | 'submitCount'
//   | 'submitting'
//   | 'submitted'
//   | 'validating'
//   | 'status'
//   | '*'

function travelSchema(schema: FormSchema, fn: (n: any) => any, travelParent = false) {
  const schemaArr = [schema]
  function travel(nodes: any[]) {
    for (const item of nodes) {
      if (Array.isArray(item.children)) {
        travel(item.children)
        if (travelParent) fn(item)
        continue
      }
      fn(item)
    }
  }
  travel(schemaArr)
}

export function nomalizeNode(node: any) {
  const falsyProps = ['required', 'focused', 'touched', 'loading', 'disabled', 'pending']
  const truthyProps = ['showLabel', 'visible', 'display']

  falsyProps.forEach((k) => (node[k] = false))
  truthyProps.forEach((k) => (node[k] = true))

  node.status = node.status ?? 'editable'
  node.label = node.label ?? null
  node.data = node.data ?? null
  node.options = node.options ?? []
  node.validator = node.validator ?? {}
  node.componentProps = node.componentProps ?? {}
  node.description = node.description
  return node
}

export type Form = ReturnType<typeof createForm>

export function createForm(schema: FormSchema) {
  const onFormChangeCallbacks = (schema as any)?.onFormChange?.() || {}
  const onFieldChangeCallbacks = (schema as any)?.onFieldChange?.() || {}

  // const initialSchema = cloneDeep(schema)

  const formUpdaters: any[] = []

  const updaterMap = new Map()

  travelSchema(
    schema,
    (item) => {
      if (item.type === 'form') {
        item.dirty = false
        item.valid = true
        item.submitCount = 0
        item.submitting = false
        item.submitted = false
        item.validating = false
        item.status = 'editable'
      }

      nomalizeNode(item)
    },
    true,
  )

  function runFormUpdaters() {
    for (const updater of formUpdaters) {
      updater({}) // rerender form
    }
  }

  function getFormState(): FormNode {
    // return getNode({ schema, match: (n) => n.type === 'form' })
    return schema
  }

  function getFieldState(name: string, schema?: FormSchema): FieldNode {
    return getNode({ schema, match: (n) => n.name === name })
  }

  function setSchema(fn: (shema: FormSchema) => any) {
    fn(schema)
    runFormUpdaters()
  }

  function setFormState(formPartialState: Partial<FormNode>) {
    const prevState = cloneDeep(schema)

    setNode(formPartialState, {
      rerender: false,
      match: (n) => {
        return n.type === 'form'
      },
    })

    /** on form change */
    for (const key of Object.keys(onFormChangeCallbacks)) {
      const k = key as keyof FormSchema

      if (key === '*') {
        if (isEqual(prevState, schema)) continue
        onFormChangeCallbacks[k](schema, prevState)
        continue
      }

      if (Reflect.has(schema, k)) {
        if (isEqual(prevState[k], schema[k])) continue
        onFormChangeCallbacks[k](schema[k], prevState[k])
      }
    }

    runFormUpdaters()
  }

  function setFieldState(name: string, fieldState: Partial<FieldNode>) {
    const prevSchema = cloneDeep(schema)

    const matchedNode = setNode(fieldState, {
      rerender: false,
      match: (n) => Reflect.has(n, 'name') && n.name === name,
    })

    /** on field change */
    for (const key of Object.keys(onFieldChangeCallbacks)) {
      if (key.startsWith('*.')) {
        const type = key.replace(/^\*\./, '') as keyof FieldNode
        const prev = getFieldCollection(type, [prevSchema])
        const next = getFieldCollection(type, [prevSchema])
        if (!isEqual(prev, next)) {
          onFieldChangeCallbacks[key](next, prev)
        }

        continue
      }

      // TODO:
      const [name, k] = key.split('.')
      const prev = getIn(getFieldState(name, prevSchema), k)
      const next = getIn(getFieldState(name, schema), k)
      if (!isEqual(prev, next)) {
        onFieldChangeCallbacks[key](next, prev)
      }
    }

    for (const fn of Fomir.onFieldChangeCallbacks) {
      fn(name, form)
    }

    rerenderNode(matchedNode)
  }

  function rerenderNode(node: any) {
    if (node) updaterMap.get(node)?.({})
  }

  function getFieldCollection(
    type: keyof FieldNode,
    arr: any[],
    ignoreInvisible = true,
    result: any = {},
  ): any {
    return arr.reduce<any>((acc, cur) => {
      if (Array.isArray(cur.children)) {
        return {
          ...acc,
          ...getFieldCollection(type, cur.children, ignoreInvisible, acc),
        }
      }

      if (!Reflect.has(cur, 'name')) return acc

      // skip invisible field
      if (ignoreInvisible && !cur.visible) return acc

      let v: any
      const k = cur.name
      if (type === 'value') {
        const { value, transform } = cur
        v = transform && typeof transform === 'function' ? transform(value) : value
      } else {
        v: (cur as any)[k]
      }

      setIn(acc, k, v)
      return acc
    }, result)
  }

  async function validateField(options: FieldValidateOptions): Promise<any> {
    let error: any = undefined
    const { validator = {} } = options.fieldState

    for (const validatorRule in validator) {
      if (!Fomir.validatorRules[validatorRule]) continue

      const { value } = options.fieldState
      const result = Fomir.validatorRules[validatorRule](value, validator[validatorRule], options)

      error = isPromise(result) ? await result : result

      if (error) break
    }

    return error
  }

  async function validateForm() {
    return await validateAllFields()
  }

  async function validateAllFields(): Promise<any> {
    let errors: any = {}
    const values = {}

    async function getErrors(arr: any[]) {
      for (const item of arr) {
        if (item.children) {
          await getErrors(item.children)
          return
        }
        if (Reflect.has(item, 'name')) {
          if (!item.visible) continue
          const error = await validateField({ fieldState: item, values })

          // if (error && error !== state.error) {
          if (error) {
            setIn(errors, item.name, error)
            setFieldState(item.name, { error })
          }
        }
      }
    }
    await getErrors([schema])

    return errors
  }

  async function change(name: string, value: any) {
    let fieldNode = getFieldState(name)
    let nextValue = value
    if (typeof fieldNode.intercept === 'function') {
      nextValue = fieldNode.intercept(value, fieldNode)
    }
    setFieldState(name, { value: nextValue }) // sync value

    fieldNode = { ...fieldNode, value: nextValue }

    const values = getValues()
    const fieldError = await validateField({ fieldState: fieldNode, values })
    const prevError = fieldNode.error
    const error = fieldError || undefined

    if (prevError !== error) setFieldState(name, { error })

    /** field change callback, for Dependent fields  */
    fieldNode?.onValueChange?.(fieldNode)
  }

  async function blur(name: string) {
    const fieldNode = getFieldState(name)
    const values = getValues()
    if ((schema as any).validationMode !== 'onSubmit') {
      const error = await validateField({ fieldState: fieldNode, values })
      if (error) setFieldState(name, { touched: true, error })
    }
  }

  async function submitForm(e?: any) {
    e && e.preventDefault()

    let valid: boolean = true
    const values = getValues()

    touchAll() // make all fields touched

    const errors = await validateForm()

    valid = isFormValid(errors)

    if (valid) {
      setSubmitting(true)
      ;(schema as any)?.onSubmit?.(values, form)
    } else {
      setFieldErrors(errors)
      ;(schema as any)?.onError?.(errors, form)
    }

    setFormState({
      valid,
      dirty: true,
      submitCount: (schema as any).submitCount! + 1,
    })
  }

  function getValues() {
    return getFieldCollection('value', [schema])
  }

  function getErrors() {
    return getFieldCollection('error', [schema])
  }

  // TODO: handle nested
  function setFieldErrors(errors: any) {
    for (const key in errors) {
      setFieldState(key, { error: errors[key] })
    }
  }

  function touchAll() {
    travelSchema(schema, (item) => {
      if (Reflect.has(item, 'name')) {
        item.touched = true
      }
    })
  }

  function setSubmitting(submitting: boolean) {
    setFormState({ submitting })
  }

  function resetForm() {
    // form.formState = initialFormState
    // ema?.onReset?.(form)
  }

  function onFieldInit(name: string) {
    const fieldNode = getFieldState(name)
    fieldNode.onFieldInit?.(fieldNode)
  }

  function getNode<T = any>(opt: NodeOptions) {
    let node: T = undefined as any
    const nodes = [opt.schema || schema]
    function travel(nodes: any[]) {
      for (const item of nodes) {
        if (Array.isArray(item.children)) {
          if (opt?.match?.(item)) {
            node = item
            break
          }
          travel(item.children)
          continue
        }

        if (opt?.match?.(item)) {
          node = item
          break
        }
      }
    }
    travel(nodes)
    return node
  }

  function setNode<T = any>(propertiesOrSetter: T | SetNodeFunction<T>, opt: NodeOptions) {
    let matchedNode: any
    const nodes = [opt.schema || schema]

    const updateNode = (node: any) => {
      matchedNode = node
      const rerender = typeof opt?.rerender === 'boolean' ? opt?.rerender : true

      if (typeof propertiesOrSetter === 'function') {
        if (rerender) rerenderNode(matchedNode)
        return (propertiesOrSetter as any)(node)
      }

      for (const k in propertiesOrSetter) {
        node[k] = propertiesOrSetter[k]
      }

      // rerender form
      if (rerender) rerenderNode(matchedNode)
    }

    function travel(nodes: any[]) {
      for (const item of nodes) {
        if (Array.isArray(item.children)) {
          if (opt?.match?.(item)) {
            updateNode(item)
            break
          }

          travel(item.children)
          continue
        }

        if (opt?.match?.(item)) {
          updateNode(item)
          break
        }
      }
    }
    travel(nodes)

    return matchedNode
  }

  function getArrayHelpers() {}

  const form = {
    schema,
    setSchema,
    updaterMap,
    data: {} as any,
    formUpdaters,

    /** getter */
    getFieldState,
    getFormState,
    getValues,
    getErrors,
    getNode,
    getFieldCollection,
    getArrayHelpers,

    /** setter */
    setFormState,
    setFieldState,
    setNode,
    setFieldErrors,
    setSubmitting,
    touchAll,

    /** handle form */
    resetForm,
    submitForm,

    /** validate */
    validateForm,
    validateField,

    onFieldInit,

    rerenderNode,

    blur,
    change,
  }

  return form
}
