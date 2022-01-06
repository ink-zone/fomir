import deepmerge from 'deepmerge'
import isEqual from 'react-fast-compare'
import isPromise from 'is-promise'
import cloneDeep from 'lodash.clonedeep'
import { getIn, setIn } from 'fomir-utils'
import { Errors, ValidatorOptions, FieldUpdaters } from './types/types'
import { Fomir } from './Fomir'
import { isFormValid } from './isFormValid'
import { validateSingleField } from './validateField'
import { FieldNode } from './types/field'
import { FormNode } from './types/form'
import { FormSchema } from './types/types'

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
export interface NodeOptions {
  schema?: FormSchema
  // at?: Location
  match?: (node: any) => boolean
  // mode?: 'highest' | 'lowest'
}

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

export type Form = ReturnType<typeof createForm>

export function createForm(schema: FormSchema) {
  const onFormChangeCallbacks = (schema as any)?.onFormChange?.() || {}
  const onFieldChangeCallbacks = (schema as any)?.onFieldChange?.() || {}

  // const initialSchema = cloneDeep(schema)

  const fieldUpdaters = {} as FieldUpdaters

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

      if (Reflect.has(item, 'name')) {
        item.visible = item.visible ?? true
        item.label = item.label ?? null
        item.showLabel = item.showLabel ?? true
        item.required = item.required ?? false
        item.description = item.description
        item.focused = item.focused ?? false
        item.type = item.type
        item.componentProps = item.componentProps ?? {}
        item.display = item.display ?? true
        item.touched = item.touched ?? false
        item.loading = item.loading ?? false
        item.disabled = item.disabled ?? false
        item.pending = item.pending ?? false
        item.status = item.status ?? 'editable'
        item.options = item.options ?? []
        item.data = item.data ?? null
        // validate: field.validate,
        item.validator = item.validator ?? {}
      }
    },
    true,
  )

  function runFieldUpdaters(name: string) {
    const updaters = fieldUpdaters[name]
    for (const updater of updaters) {
      updater({}) // rerender field
    }
  }

  function getFormState() {
    return getNode({ schema, match: (n) => n.type === 'form' })
  }

  function getFieldState(name: string, schema?: FormSchema): FieldNode {
    return getNode({ schema, match: (n) => n.name === name })
  }

  function setFormState(formPartialState: Partial<FormNode>) {
    const prevState = cloneDeep(schema)

    setNode(formPartialState, { match: (n) => n.type === 'form' })

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
  }

  function setFieldState(name: string, fieldState: Partial<FieldNode>) {
    const prevSchema = cloneDeep(schema)

    setNode(fieldState, { match: (n) => Reflect.has(n, 'name') && n.name === name })

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

    runFieldUpdaters(name)
  }

  function getFieldCollection(type: keyof FieldNode, arr: any[], ignoreInvisible = true): any {
    return arr.reduce<any>((acc, cur) => {
      if (Array.isArray(cur.children)) {
        return {
          ...acc,
          ...getFieldCollection(type, cur.children),
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
    }, {})
  }

  async function validateField(name: string): Promise<false | string> {
    const state = getFieldState(name)
    const values = getValues()

    const [validatorErrors, fieldError] = await Promise.all([
      runValidators({
        ...form,
        values,
      }),
      validateSingleField({ fieldState: state, values }),
    ])

    const prevError = state.error
    const error = fieldError || getIn(validatorErrors, name)

    if (error === prevError || !error) return false

    return error
  }

  async function runValidators(options: ValidatorOptions): Promise<Errors> {
    const promises = Fomir.validators.map((validator) => validator(options))

    // run validate function
    promises.push(runUserValidator(options))

    const errorsArray = await Promise.all(promises)

    const errors = deepmerge.all(errorsArray)

    return errors
  }

  async function validateForm() {
    const values = getValues()

    const [validatorErrors, fieldErrors] = await Promise.all([
      runValidators({
        ...form,
        values,
      }),
      validateAllFields(),
    ])

    const errors = deepmerge(validatorErrors, fieldErrors) as any
    return errors
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
          const error = await validateSingleField({ fieldState: item, values })

          // if (error && error !== state.error) {
          if (error) {
            setIn(errors, item.name, error)
            setFieldState(item.name, { error })
          }
        }
      }
    }
    getErrors([schema])

    return errors
  }

  async function runUserValidator(validatorOptions: ValidatorOptions): Promise<Errors> {
    if (!(schema as any)?.validate) return {}

    // function validate
    let validateFnErrors = (schema as any)?.validate?.(validatorOptions)

    // sync validate
    if (!isPromise(validateFnErrors)) return validateFnErrors

    try {
      return (await validateFnErrors) as any
    } catch {
      return {}
    }
  }

  async function change(name: string, value: any) {
    let fieldState = getFieldState(name)
    let nextValue = value
    if (typeof fieldState.intercept === 'function') {
      nextValue = fieldState.intercept(value, fieldState)
    }
    setFieldState(name, { value: nextValue }) // sync value

    fieldState = { ...fieldState, value: nextValue }

    const values = getValues()
    const fieldError = await validateSingleField({ fieldState, values })
    const prevError = fieldState.error
    const error = fieldError || undefined

    if (prevError !== error) setFieldState(name, { error })

    /** field change callback, for Dependent fields  */
    fieldState?.onValueChange?.({
      ...fieldState,
      setFieldState: (name, fieldState) => {
        // TODO: need improve, make it async
        setTimeout(() => {
          setFieldState(name, fieldState)
        }, 0)
      },
    })
  }

  async function submitForm(e?: any) {
    if (e && e.preventDefault) e.preventDefault()

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

  function registerField(name: string, updater: any) {
    if (fieldUpdaters[name]) {
      fieldUpdaters[name].push(updater)
    } else {
      fieldUpdaters[name] = [updater]
    }
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

  async function blur(name: string) {
    if ((schema as any).validationMode !== 'onSubmit') {
      const error = await validateField(name)
      if (error) setFieldState(name, { touched: true, error })
    }
  }

  function onFieldInit(name: string) {
    const fieldState = getFieldState(name)
    fieldState?.onFieldInit?.({
      ...fieldState,
      setFieldState: (name, fieldState) => {
        setFieldState(name, fieldState)
      },
    })
  }

  function getNode<T = any>(opt: NodeOptions) {
    let node: T = undefined as any
    const nodes = [opt.schema || schema]
    function travel(nodes: any[]) {
      for (const item of nodes) {
        if (Array.isArray(item.children)) {
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

  function setNode(properties: any, opt: NodeOptions) {
    const nodes = [opt.schema || schema]
    function travel(nodes: any[]) {
      for (const item of nodes) {
        if (Array.isArray(item.children)) {
          travel(item.children)
          continue
        }

        if (opt?.match?.(item)) {
          for (const k in properties) {
            item[k] = properties[k]
          }
          break
        }
      }
    }
    travel(nodes)
  }

  const form = {
    schema,
    data: {} as any,
    registerField,
    getFieldCollection,
    getFieldState,
    setFieldState,
    getValues,
    getErrors,
    setFieldErrors,
    getNode,
    setNode,
    touchAll,
    getFormState,
    setSubmitting,
    setFormState,
    validateForm,
    validateField,
    validateAllFields,
    resetForm,
    onFieldInit,
    submitForm,
    blur,
    change,
  }

  return form
}
