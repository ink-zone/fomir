export type Status = 'editable' | 'disabled' | 'preview' | ({} & string)

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export interface Validator {
  required?: boolean

  min?: number

  max?: number

  minLength?: number

  maxLength?: number

  pattern?: RegExp

  arrayNotEmpty?: boolean

  equalTo?: string

  trigger?: string

  message: string

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

  validators: Validator[]
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
