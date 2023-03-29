import React, { HTMLAttributes, ReactNode } from 'react'
import type { FormType } from '../createForm'
import type { FormSchema } from './form'
import type { FieldNode } from './field'
import { Node, BaseNode } from './node'

export * from './custom-types'
export * from './form'
export * from './field'
export * from './node'
export * from './custom-types'

export type ForceUpdate = React.Dispatch<React.SetStateAction<{}>>

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
  match?: (node: Node) => boolean
  // mode?: 'highest' | 'lowest'
}

export type SetNodeFunction<T = Node> = (node: T) => any

export interface ValidatorOptions {
  fieldState: FieldNode
  form: FormType
}

export type ValidationRuleFn<T = any, K = any> = (
  value: T,
  validatorValue: K,
  options: ValidatorOptions,
) => any | Promise<any>

export type OnFormStateChange = (form: FormType) => any
export type OnFieldStateChange = (name: string, form: FormType) => any

export interface FomirPlugin {
  components?: Record<string, any>

  validators?: Record<string, ValidationRuleFn>

  onFormStateChange?: OnFormStateChange

  onFieldChange?: OnFieldStateChange
}

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type FomirValue = any

export interface FieldHandlers {
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

export type FormSuffixType = JSX.Element | ((schema: FormSchema) => JSX.Element)

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  form: FormType
  children?: ReactNode
  suffix?: FormSuffixType
}

export interface FormRegisterProps extends FormType {}

export interface FormSpyRenderProps extends FormSchema, FormType {}

export interface FormSpyProps {
  children: (formSpyRenderProps: FormSpyRenderProps) => ReactNode
}

export interface NodeProps<T extends Node = Required<BaseNode>> {
  node: T
  children?: ReactNode
  handler: FieldHandlers
}
