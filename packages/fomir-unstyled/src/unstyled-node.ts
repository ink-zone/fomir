import { FieldNode } from 'fomir'
import { InputHTMLAttributes } from 'react'

export interface InputNode extends FieldNode {
  type: 'Input'
  value?: string
  componentProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface SelectNode extends FieldNode {
  type: 'Select'
}

export interface CheckboxNode extends FieldNode {
  type: 'Checkbox'
  componentProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface CheckboxGroupNode extends FieldNode {
  type: 'CheckboxGroup'
}

export interface RadioGroupNode extends FieldNode {
  type: 'RadioGroup'
}

export interface TextareaNode extends FieldNode {
  type: 'Textarea'
}

export type UnstyledNode =
  | InputNode
  | SelectNode
  | CheckboxNode
  | CheckboxGroupNode
  | RadioGroupNode
  | TextareaNode
