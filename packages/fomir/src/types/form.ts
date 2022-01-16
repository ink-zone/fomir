import { FieldNode } from './field'
import { Node } from './node'
import { Errors } from './types'
import type { Form } from '../createForm'

export interface ArrayFieldNode {
  type: 'ArrayField'
  name: string
  children: (Node | ArrayFieldItemNode)[]
}

export interface ArrayFieldItemNode {
  type: 'ArrayFieldItem'
  children: Node[]
}

export interface FormNode<T = any> {
  submitting?: boolean
  submitted?: boolean
  submitCount?: number

  validating?: boolean
  dirty?: boolean
  valid?: boolean
  // status: Status

  /** form unique name, optional */
  name?: string

  children?: (Node | FieldNode | ArrayFieldNode | ArrayFieldItemNode)[]

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  /**
   * callback when form submit
   * @param values current values
   */
  onSubmit?(values: T, form: Form): Promise<any> | any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>, form: Form): Promise<any> | any

  /**
   * callback when reset form
   */
  onReset?(form: Form): Promise<any> | any

  onFormChange?: any

  onFieldChange?: any
}
