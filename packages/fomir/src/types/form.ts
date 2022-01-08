import { FieldNode } from './field'
import { Node } from './node'
import { Errors } from './types'

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Select'
  | 'Textarea'
  | 'Switch'
  | ({} & string)
  // | FunctionComponent
  // | Component
  | ((...args: any[]) => JSX.Element)

export interface ArrayFieldNode {
  type: 'array'
  name: string
  children: (Node | ArrayItemNode)[]
}

export interface ArrayItemNode {
  type: 'arrayItem'
  children: Node[]
}

export interface FormNode<T = any> {
  type: 'form'
  submitting?: boolean
  submitted?: boolean
  submitCount?: number

  validating?: boolean
  dirty?: boolean
  valid?: boolean
  // status: Status

  /** form unique name, optional */
  name?: string

  children: (Node | FieldNode | ArrayFieldNode | ArrayItemNode)[]

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  /**
   * callback when form submit
   * @param values current values
   */
  onSubmit?(values: T, formApi: any): Promise<any> | any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>, formApi: any): Promise<any> | any

  /**
   * callback when reset form
   */
  onReset?(formApi: any): Promise<any> | any

  onFormChange?: any

  onFieldChange?: any
}
