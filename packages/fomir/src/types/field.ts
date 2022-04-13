import { BaseNode } from '..'
import type { createForm } from '../createForm'

type Form  = ReturnType<typeof createForm>

export interface Validators {
  required?: string

  min?: [number, string]

  max?: [number, string]

  minLength?: [number, string]

  maxLength?: [number, string]

  pattern?: [RegExp, string]

  arrayNotEmpty?: string

  equalTo?: [string, string]

  [key: string]: any
}

export interface FieldHandler {
  intercept<T>(value: T, fieldState: Omit<FieldNode, 'intercept'>): T

  transform<T>(value: T): T

  onValueChange(fieldNode: FieldNode): Promise<any> | any

  onFieldInit(fieldNode: FieldNode, form: Form): Promise<any> | any
}

export interface FieldNode extends BaseNode, Partial<FieldHandler> {
  name: string
  validators?: Validators
}
