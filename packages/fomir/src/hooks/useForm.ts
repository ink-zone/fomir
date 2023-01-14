import { createForm, FormType } from '../createForm'
import { FormSchema } from '../types'

export function useForm<T = any>(schema: FormSchema<T>): FormType<T> {
  return createForm<T>(schema)
}
