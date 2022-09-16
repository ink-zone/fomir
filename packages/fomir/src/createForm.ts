import isEqual from 'react-fast-compare'
import arrayMove from 'array-move'
import isPromise from 'is-promise'
import { getIn, setIn, cloneDeep } from './utils'
import { FieldNode } from './types/field'
import { FormSchema } from './types/form'
import { NodeOptions, SetNodeFunction, ValidatorOptions } from './types/types'
import { Fomir } from './Fomir'
import { Node } from '.'

function travelNodes(nodes: any[] = [], fn: (n: any) => any, travelParent = false) {
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
  travel(nodes)
}

export function normalizeNode(node: any) {
  const falsyProps = ['required', 'focused', 'touched', 'loading', 'disabled']
  const truthyProps = ['showLabel', 'visible', 'display']

  falsyProps.forEach((k) => (node[k] = node[k] ?? false))
  truthyProps.forEach((k) => (node[k] = node[k] ?? true))

  node.status = node.status ?? 'editable'
  node.label = node.label ?? null
  node.data = node.data ?? null
  node.options = node.options ?? []
  node.validators = node.validators ?? {}
  node.componentProps = node.componentProps ?? {}
  node.description = node.description ?? null
  return node
}

export type Form<T = any> = Omit<ReturnType<typeof createForm>, 'setValues'> & {
  setValues(values: T): T
}

export function createForm<T = any>(schema: FormSchema<T>) {
  const formUpdaters: any[] = []
  const NODE_TO_UPDATER = new WeakMap()
  const NODE_TO_INDEX = new WeakMap()
  const NODE_TO_PARENT = new WeakMap()
  const NAME_TO_NODE = new Map()
  const NODE_TO_NAME = new WeakMap()

  // For form node
  schema.dirty = false
  schema.valid = true
  schema.submitCount = 0
  schema.submitting = false
  schema.submitted = false
  schema.validating = false
  schema.status = 'editable'

  schema.components = {
    ...Fomir.compenents,
    ...schema.components,
  }

  travelNodes(
    schema.children,
    (item) => {
      normalizeNode(item)
    },
    true,
  )

  const initialSchema = cloneDeep(schema)

  function runFormUpdaters() {
    for (const updater of formUpdaters) {
      updater({}) // rerender form
    }
  }

  function getFormState(): FormSchema {
    return schema
  }

  function getFieldState(name: string, schema?: FormSchema): FieldNode {
    return getNode({ schema, match: (n) => n.name === name })
  }

  function setSchema(fn: (shema: FormSchema) => any) {
    fn(schema)
    runFormUpdaters()
  }

  function setFormState(formPartialState: Partial<FormSchema>) {
    const prevSchema = cloneDeep(schema)
    const { watch = {} } = form.schema

    for (const key in formPartialState) {
      ;(schema as any)[key] = formPartialState[key as keyof FormSchema]
    }

    /** on form change */
    for (const key of Object.keys(watch)) {
      if (!key.startsWith('$.')) continue
      let k = key.replace(/^\$\./, '') as keyof FormSchema

      if (Reflect.has(schema, k)) {
        if (isEqual(prevSchema[k], schema[k])) continue
        watch[key](schema[k] as any, prevSchema[k])
      }
    }

    runFormUpdaters()
  }

  function setFieldState(namePath: string, fieldState: Partial<FieldNode>) {
    const { watch = {} } = form.schema
    let fieldNode = form.NAME_TO_NODE.get(namePath)

    /** Put values,errors... to a map */
    const prevMap = Object.keys(watch)
      .filter((k) => k.startsWith('*.'))
      .map((k) => k.replace(/^\*\./, ''))
      .reduce((acc, cur) => {
        acc[cur] = getFieldCollection(cur as keyof FieldNode, [schema])
        return acc
      }, {} as any)

    const prevSchema = cloneDeep(schema)

    // TODO: need refactor
    const matchedNode = setNode(fieldState, {
      rerender: false,
      match: (n) => n === fieldNode,
    })

    /** on field change */
    for (const key of Object.keys(watch)) {
      if (key.startsWith('*.')) {
        const type = key.replace(/^\*\./, '') as keyof FieldNode
        const prev = prevMap[type]
        const next = getFieldCollection(type, [schema])
        if (!isEqual(prev, next)) {
          watch[key](next, prev)
        }

        continue
      }

      /** for single field */
      const arr = key.split('.')
      const type = arr[arr.length - 1]
      const name = arr.slice(0, -1).join('.')

      const prev = getIn(getFieldState(name, prevSchema), type)
      const next = getIn(getFieldState(name, schema), type)

      if (!isEqual(prev, next)) {
        const { transform } = fieldNode
        if (transform) {
          watch[key](transform(next), transform(prev))
        } else {
          watch[key](next, prev)
        }
      }
    }

    for (const fn of Fomir.onFieldChangeCallbacks) {
      fn(namePath, form)
    }

    rerenderNode(matchedNode)
  }

  function rerenderNode(node: any) {
    if (node) NODE_TO_UPDATER.get(node)?.({})
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

      // must have a name
      if (!Reflect.has(cur, 'name')) return acc

      // skip invisible field
      if (ignoreInvisible && !cur.visible) return acc

      let v: any
      const k = NODE_TO_NAME.get(cur)

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

  async function validateField(options: ValidatorOptions): Promise<any> {
    let error: any = undefined
    const { validators = {} } = options.fieldState
    const { value } = options.fieldState

    for (const v in validators) {
      let result: any
      if (typeof validators[v] === 'function') {
        result = validators[v](value, options)
      } else {
        if (!Fomir.validators[v]) continue
        result = Fomir.validators[v](value, validators[v], options)
      }

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

    async function getErrors(arr: any[]) {
      for (const item of arr) {
        if (item.children) {
          await getErrors(item.children)
        } else {
          if (Reflect.has(item, 'name')) {
            if (!item.visible) continue
            const error = await validateField({ fieldState: item, form })

            // if (error && error !== state.error) {
            if (error) {
              setIn(errors, item.name, error)
              setFieldState(item.name, { error })
            }
          }
        }
      }
    }
    await getErrors([schema])

    return errors
  }

  async function change(namePath: string, value: any) {
    let fieldNode = form.NAME_TO_NODE.get(namePath)
    let nextValue = value
    if (typeof fieldNode?.intercept === 'function') {
      nextValue = fieldNode.intercept(value, fieldNode, form)
    }

    setFieldState(namePath, { value: nextValue }) // sync value

    fieldNode = { ...fieldNode, value: nextValue }
    const fieldError = await validateField({ fieldState: fieldNode, form })
    const prevError = fieldNode.error
    const error = fieldError || undefined

    if (prevError !== error) setFieldState(namePath, { error })

    /** field change callback, for Dependent fields  */
    fieldNode?.onValueChange?.(fieldNode)
  }

  async function blur(namePath: string) {
    let fieldNode = form.NAME_TO_NODE.get(namePath)
    if (schema.validationMode !== 'onSubmit') {
      const error = await validateField({ fieldState: fieldNode, form })
      if (error) setFieldState(namePath, { touched: true, error })
    }
  }

  async function submitForm(e?: any) {
    e && e?.preventDefault()

    let valid: boolean = true
    const values = getValues()

    touchAll() // make all fields touched

    const errors = await validateForm()

    valid = isValid(errors)

    if (valid) {
      setSubmitting(true)
      schema?.onSubmit?.(values)
    } else {
      setFieldErrors(errors)
      schema?.onError?.(errors)
    }

    setFormState({
      valid,
      dirty: true,
      submitCount: schema.submitCount! + 1,
    })
  }

  function getValues<V = T>(name?: string): V {
    const values = getFieldCollection('value', [schema])
    return name ? getIn(values, name) : values
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
    travelNodes(schema.children, (item) => {
      if (Reflect.has(item, 'name')) {
        item.touched = true
      }
    })
  }

  function setValues(values: T) {
    const changedNodeNames: string[] = []
    travelNodes(schema.children, (item) => {
      const nodeName = NODE_TO_NAME.get(item)
      if (nodeName) {
        const nextValue = getIn(values, nodeName)
        if (item.value !== nextValue) {
          item.value = nextValue
          rerenderNode(item)
          changedNodeNames.push(nodeName)
        }
      }
    })

    /** handle form watch */
    const watch = schema.watch || {}
    for (const key of Object.keys(watch || {})) {
      if (key.startsWith('*.')) continue

      const arr = key.split('.')
      const type = arr[arr.length - 1]
      const name = arr.slice(0, -1).join('.')
      if (type === 'value' && changedNodeNames.includes(name)) {
        watch[key](getIn(values, name))
      }
    }

    rerenderNode(form)
    return getValues()
  }

  function setSubmitting(submitting: boolean) {
    setFormState({ submitting })
  }

  function resetForm() {
    schema = cloneDeep(initialSchema)
    form.schema = schema
    rerenderNode(form)
    form.schema?.onReset?.()
  }

  function onFieldInit(namePath: string, form: any) {
    const fieldNode = getFieldState(namePath)
    fieldNode?.onFieldInit?.(fieldNode, form)
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

  // TODO:
  function getArrayHelpers(name: string, arrayNode?: any) {
    const arrayField =
      arrayNode ||
      getNode({
        match: (n) => n.name === name,
      })

    const fields = arrayField.children

    const isValidIndex = (...args: number[]) => {
      return !args.some((i) => i < 0 || i > fields.length)
    }

    function move(from: number, to: number) {
      if (!isValidIndex(from, to)) return

      arrayField.children = arrayMove(fields, from, to)
      rerenderNode(arrayField)
    }
    return {
      isFirst(index: number) {
        return index === 0
      },
      isLast(index: number) {
        return index + 1 === arrayField?.children?.length
      },
      push<T = any>(value: T) {
        if (arrayField.children[0]) {
          const item = cloneDeep(arrayField.children[0])
          for (const c of item.children) {
            delete c.value
          }
          arrayField.children.push(item)
        }
        rerenderNode(arrayField)
        if (value) {
          // TODO:
        }
      },
      // unshift,
      remove(index: number) {
        arrayField.children.splice(index, 1)
        rerenderNode(arrayField)
      },
      move,
      swap: move,
      // insert,
    }
  }

  function getNodeName(node: any) {
    let name: string = node.name || ''
    let child = node

    while (true) {
      const parent = NODE_TO_PARENT.get(child)

      if (parent == null) {
        break
      }

      const i = NODE_TO_INDEX.get(child)

      if (parent.name) {
        if (parent.isArrayField && name) {
          name = parent.name + `[${i}].` + name
        } else {
          name = parent.name + name
        }
      }

      child = parent
    }

    return name
  }

  function findPath(node: any) {
    const path: number[] = []
    let child = node

    while (true) {
      const parent = NODE_TO_PARENT.get(child)

      if (parent == null) {
        break
      }

      const i = NODE_TO_INDEX.get(child)

      if (i == null) {
        break
      }

      path.unshift(i)
      child = parent
    }

    return path
  }

  function getParent(node: any) {
    return NODE_TO_PARENT.get(node)
  }

  function getNodeIndex(node: any) {
    return NODE_TO_INDEX.get(node)
  }

  function getNodeComponent(node: Node) {
    const { component } = node
    const { components } = schema
    if (components?.[component]) return components[component]
    return null
  }

  /**
   * check form is valid
   * @param errors errors object
   */
  function isValid(errors: any = {}): boolean {
    let valid = true
    function loopErrors(errors: any) {
      for (const key of Object.keys(errors)) {
        let error = errors[key]
        if (!error) continue // skip it

        if (typeof error === 'object') {
          loopErrors(error)
        } else {
          error = String(error) as string
          valid = error.length ? false : true
        }
      }
    }
    loopErrors(errors)
    return valid
  }

  const form = {
    schema,
    setSchema,
    data: {} as any,
    formUpdaters,
    NODE_TO_UPDATER,
    NODE_TO_INDEX,
    NODE_TO_PARENT,
    NAME_TO_NODE,
    NODE_TO_NAME,

    normalizeNode,

    getParent,
    getNodeIndex,

    findPath,
    getNodeName,
    getNodeComponent,

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
    setValues,

    /** handle form */
    resetForm,
    submitForm,

    /** validate */
    validateForm,
    validateField,
    isValid,

    isSchema: (node: any) => {
      return node === schema
    },

    onFieldInit,

    rerenderNode,

    blur,
    change,
  }

  return form
}
