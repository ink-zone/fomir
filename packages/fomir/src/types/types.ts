import type { Form } from '../createForm'
import type { FormNode } from './form'
import type { FieldNode } from './field'
export type ForceUpdate = any

export interface FieldUpdaters {
  [key: string]: ForceUpdate[]
}

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? Errors<T[K]>
    : string
}

export interface NodeOptions {
  schema?: FormSchema
  // at?: Location

  rerender?: boolean
  match?: (node: any) => boolean
  // mode?: 'highest' | 'lowest'
}

export type SetNodeFunction<T> = (node: T) => any

export interface FieldValidateOptions {
  fieldState: FieldNode
  values: any
}

export type ValidationRuleFn<T = any, K = any> = (
  value: T,
  validateValue: K,
  options: FieldValidateOptions,
) => any | Promise<any>

export type OnFormStateChange = (form: Form) => any
export type OnFieldStateChange = (name: string, form: Form) => any

export interface FomirPlugin {
  components?: Record<string, any>

  validators?: Record<string, ValidationRuleFn>

  onFormStateChange?: OnFormStateChange
  onFieldChange?: OnFieldStateChange
}

export type FormSchema = FormNode
