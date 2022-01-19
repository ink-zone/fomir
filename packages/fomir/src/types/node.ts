import { FC, ReactNode } from 'react'
import { ExtendedType } from './custom-types'

interface FieldHandlers {
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

interface NodeProps<T extends Node = any> {
  node: T & { type: any }
  handler: FieldHandlers
  children?: ReactNode
}

type Status = 'editable' | 'disabled' | 'preview' | ({} & string)

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export interface BaseNode {
  label: any

  showLabel: boolean

  required: boolean

  description: any

  componentProps: any

  value: any

  error: string

  warning: string

  loading: boolean

  pending: boolean

  touched: boolean

  disabled: boolean

  focused: boolean

  display: boolean

  visible: boolean

  status: Status

  options: Options

  data: any

  updaters?: ((...args: any[]) => void)[]

  component?: FC<NodeProps>
}

export type Node = ExtendedType<'Node', BaseNode>
