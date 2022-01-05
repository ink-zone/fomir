import { Errors, ValidatorOptions } from '../types'

/**
 * Extendable Custom Types Interface
 */

type ExtendableTypes =
  | 'Form'
  | 'Element'
  | 'Text'
  | 'Selection'
  | 'Range'
  | 'Point'
  | 'Operation'
  | 'InsertNodeOperation'
  | 'InsertTextOperation'
  | 'MergeNodeOperation'
  | 'MoveNodeOperation'
  | 'RemoveNodeOperation'
  | 'RemoveTextOperation'
  | 'SetNodeOperation'
  | 'SetSelectionOperation'
  | 'SplitNodeOperation'

export interface CustomTypes {
  [key: string]: unknown
}

export type ExtendedType<K extends ExtendableTypes, B> = unknown extends CustomTypes[K]
  ? B
  : CustomTypes[K]

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

export interface BaseForm<T = any> {
  type: 'form'
  submitting: boolean
  submitted: boolean
  submitCount: number

  validating: boolean
  dirty: boolean
  valid: boolean
  // status: Status

  /** form unique name, optional */
  name?: string

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  /**
   * form-level validation
   * @param values current values
   */
  validate?(options: ValidatorOptions<T>): Errors<T>

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

  onFormChange: any

  onFieldChange: any
}

export type FormNode = ExtendedType<'Form', BaseForm>
