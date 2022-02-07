import { createForm, FormSchema, Form } from 'fomir'
import { useRef } from 'react'

export function useForm<T = any>(schema: FormSchema<T>): Form<T> {
  const { current } = useRef(createForm<T>(schema))
  return current as Form<T>
}
