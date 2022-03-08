import { FieldNode, BaseNode, Node } from 'fomir'
import { InputProps } from '@bone-ui/input'
import { ButtonProps } from '@bone-ui/button'
import { AtomicProps } from '@fower/atomic-props'
import { InputHTMLAttributes } from 'react'

export interface InputNode extends FieldNode {
  component: 'Input'
  value?: string
  componentProps?: InputProps
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
  componentProps?: ButtonProps & AtomicProps
}

export interface SubmitNode extends BaseNode {
  component: 'Submit'
  text: string
  componentProps?: ButtonProps & AtomicProps
}

export interface BoxNode extends BaseNode {
  component: 'Box'
  css?: string
  text?: string
  children?: Node[]
}

export type BoneUINode =
  | InputNode
  | SelectNode
  | CheckboxNode
  | CheckboxGroupNode
  | RadioGroupNode
  | TextareaNode
  | ResetNode
  | SubmitNode
  | BoxNode
