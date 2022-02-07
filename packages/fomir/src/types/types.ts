import type { Form } from '../createForm'
import type { FormSchema } from './form'
import type { FieldNode } from './field'
import type { ExtendedType } from './custom-types'

export type ForceUpdate = any

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

  /** is rerender current node */
  rerender?: boolean
  match?: (node: any) => boolean
  // mode?: 'highest' | 'lowest'
}

export type SetNodeFunction<T> = (node: T) => any

export interface ValidatorOptions {
  fieldState: FieldNode
  form: Form
}

export type ValidationRuleFn<T = any, K = any> = (
  value: T,
  validatorValue: K,
  options: ValidatorOptions,
) => any | Promise<any>

export type OnFormStateChange = (form: Form) => any
export type OnFieldStateChange = (name: string, form: Form) => any

export interface BaseValidator {
  message: string
}

export type Validator = ExtendedType<'Validator', BaseValidator>

export interface FomirPlugin {
  components?: Record<string, any>

  validators?: Record<string, ValidationRuleFn>

  onFormStateChange?: OnFormStateChange

  onFieldChange?: OnFieldStateChange
}
