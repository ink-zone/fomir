import React, { HTMLAttributes, ReactNode } from 'react'
import { createForm, FieldNode, FormNode } from 'fomir'

type Form = ReturnType<typeof createForm>

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

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  form: Form
  children?: ReactNode
  [key: string]: any
}

export interface FieldRegister {
  value: FomirValue
  // multiple?: boolean
  // checked?: boolean
  onChange: FieldHandlers['handleChange']
  onBlur: FieldHandlers['handleBlur']
}

export interface FormRegisterProps extends Form {}

export interface FieldRegisterProps<T = any> extends FieldRenderProps<T> {}

export interface FieldRenderProps<T = any> extends FieldNode<T>, FieldHandlers {
  register: FieldRegister
  setFieldState: (fieldState: Partial<FieldNode>) => void
}

export interface FieldSpyProps {
  name: string | string[]
  children: (...fieldStores: FieldNode[]) => ReactNode
}

export interface FormSpyRenderProps extends FormNode, Form {}

export interface FormSpyProps {
  children: (formSpyRenderProps: FormSpyRenderProps) => ReactNode
}

export interface FieldProps<T = any> extends Partial<FieldNode<T>> {
  name: string
  children?: (props: FieldRenderProps) => ReactNode
}
