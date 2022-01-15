import { createForm, FormSchema } from 'fomir'
import { useRef } from 'react'

export function useForm(schema: FormSchema) {
  const { current } = useRef(createForm(schema))
  return current
}
