export type Status = 'editable' | 'disabled' | 'preview' | ({} & string)

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export interface Validators {
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

  pattern?: [RegExp, string]

  arrayNotEmpty?: string

  equalTo?: [string, string]

  validate?: (...args: any[]) => any

  [key: string]: any
}

export interface FieldState {
  label: any

  props: any

  showLabel: boolean

  required: boolean

  description: any

  component: any

  value: any

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

  validators: Validators
}

export interface FieldHandler {
  intercept<T>(value: T, fieldState: Omit<FieldNode, 'intercept'>): T

  transform<T>(value: T): T

  onValueChange(fieldNode: FieldNode): Promise<any> | any

  onFieldInit(fieldNode: FieldNode): Promise<any> | any
}

export interface FieldNode extends Partial<FieldState>, Partial<FieldHandler> {
  name: string
  [key: string]: any
}
