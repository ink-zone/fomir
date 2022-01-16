import { createForm, FormNode } from 'fomir'
import { useRef } from 'react'

export function useForm<T>(schema: FormNode<T>) {
  const { current } = useRef(createForm<T>(schema))
  return current
}
