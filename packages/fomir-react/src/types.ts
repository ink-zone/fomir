import React, { HTMLAttributes, ReactNode } from 'react'
import { FormSchema, Node, Form, BaseNode } from 'fomir'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type ForceUpdate = React.Dispatch<React.SetStateAction<{}>>

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
  form: Form
  children?: ReactNode
  suffix?: FormSuffixType
}

export interface FormRegisterProps extends Form {}

export interface FormSpyRenderProps extends FormSchema, Form {}

export interface FormSpyProps {
  children: (formSpyRenderProps: FormSpyRenderProps) => ReactNode
}

export interface NodeProps<T extends Node = Required<BaseNode>> {
  node: T
  children?: ReactNode
  handler: FieldHandlers
}
