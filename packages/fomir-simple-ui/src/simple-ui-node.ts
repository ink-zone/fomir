import { FieldNode, BaseNode, Node } from 'fomir'
import { InputHTMLAttributes } from 'react'

export interface InputNode extends FieldNode {
  component: 'Input'
  value?: string
  componentProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface SelectNode extends FieldNode {
  component: 'Select'
}

export interface CheckboxNode extends FieldNode {
  component: 'Checkbox'
  componentProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface CheckboxGroupNode extends FieldNode {
  component: 'CheckboxGroup'
}

export interface RadioGroupNode extends FieldNode {
  component: 'RadioGroup'
}

export interface TextareaNode extends FieldNode {
  component: 'Textarea'
}

export interface ResetNode extends BaseNode {
  component: 'Reset'
  text: string
}

export interface SubmitNode extends BaseNode {
  component: 'Submit'
  text: string
}

export interface BoxNode extends BaseNode {
  component: 'Box'
  css?: string
  text?: string
  children?: Node[]
}

export type SimpleUINode =
  | InputNode
  | SelectNode
  | CheckboxNode
  | CheckboxGroupNode
  | RadioGroupNode
  | TextareaNode
  | ResetNode
  | SubmitNode
  | BoxNode
