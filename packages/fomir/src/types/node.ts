import { ComponentType } from 'react'
import { ExtendedType } from './custom-types'

type Status = 'editable' | 'disabled' | 'preview' | ({} & string)

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export interface BaseNode<V = any> {
  component: string

  isArrayField?: boolean

  label?: any

  showLabel?: boolean

  required?: boolean

  description?: any

  componentProps?: any

  value?: V

  id?: string

  name?: string

  error?: string

  warning?: string

  loading?: boolean

  pending?: boolean

  touched?: boolean

  disabled?: boolean

  focused?: boolean

  display?: boolean

  visible?: boolean

  status?: Status

  text?: string

  options?: Options

  data?: any

  wrapper?: boolean | ComponentType<any>

  updaters?: ((...args: any[]) => void)[]

  renderChildren?: (node: any) => any
}

export type Node = ExtendedType<'Node', BaseNode>
