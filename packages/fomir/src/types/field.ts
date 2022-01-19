import { Node } from './node'

export interface Validators {
  required?: string

  min?: [number, string]

  max?: [number, string]

  minLength?: [number, string]

  maxLength?: [number, string]

  pattern?: [RegExp, string]

  arrayNotEmpty?: string

  equalTo?: [string, string]

  [key: string]: unknown
}

export interface FieldState extends Node {
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
