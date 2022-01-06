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

export interface OnFieldInitOptions extends FieldNode {
  setFieldState: (name: string, fieldState: Partial<FieldNode>) => void
}

export interface OnValueChangeOptions extends FieldNode {
  setFieldState: (name: string, fieldState: Partial<FieldNode>) => void
}

export interface FieldState {
  label: any
  props: any
  showLabel: boolean

  required: boolean

  description: any

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

  // validate: FieldValidator<T>

  validator: FieldValidator
}

export interface FieldHandler {
  intercept<T>(value: T, fieldState: Omit<FieldNode, 'intercept'>): T

  transform<T>(value: T): T

  onValueChange(options: OnValueChangeOptions): Promise<any> | any

  onFieldInit(options: OnFieldInitOptions): Promise<any> | any
}

export interface FieldNode extends Partial<FieldState>, Partial<FieldHandler> {
  type: string
  name: string
}

// export const Field = {
//   isField(node: any): node is BaseFieldNode {
//     return Reflect.has(node, 'name')
//   },
// }
