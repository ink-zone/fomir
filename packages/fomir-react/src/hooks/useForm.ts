import { createForm, FormSchema } from 'fomir'
import { useRef } from 'react'

export function useForm<T = any>(schema: FormSchema<T>) {
  const { current } = useRef(createForm<T>(schema))
  return current
}
