export type Status = 'editable' | 'disabled' | 'preview' | ({} & string)

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export interface FieldValidator {
  /**
   * @example 
   ```jsx
    <Field name="email" validator={{required: "Email is Require"}}/>
   ```
   */
  required?: string

  min?: [number, string]

  max?: [number, string]

  minLength?: [number, string]

  maxLength?: [number, string]

  pattern?: [RegExp, string] | [RegExp, string][]

  arrayNotEmpty?: string

  equalTo?: [string, string]

  // validate?: any

  [key: string]: any
}

export interface OnFieldInitOptions<T = any> extends FieldNode<T> {
  setFieldState: <T = any>(name: string, fieldState: Partial<FieldNode<T>>) => void
}

export interface OnValueChangeOptions<T> extends FieldNode<T> {
  setFieldState: <T = any>(name: string, fieldState: Partial<FieldNode<T>>) => void
}

export interface FieldNode<T = any> {
  label: any
  type: string
  componentProps: any

  showLabel: boolean

  required: boolean

  description: any

  value: T

  error: string | undefined

  warning: string | undefined

  loading: boolean

  touched: boolean

  disabled: boolean

  focused: boolean

  display: boolean

  visible: boolean

  status: Status

  pending: boolean

  options: Options

  data: any

  // validate: FieldValidator<T>

  validator: FieldValidator

  intercept?(value: T, fieldState: Omit<FieldNode, 'intercept'>): T

  transform?(value: T): T

  onValueChange(options: OnValueChangeOptions<T>): Promise<any> | any

  onFieldInit(options: OnFieldInitOptions<T>): Promise<any> | any
}

const Field = {
  isField(node: any): node is FieldNode {
    return Reflect.has(node, 'name')
  },
}
