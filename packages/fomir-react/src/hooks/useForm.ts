import { Form } from 'fomir'
import { useContext } from 'react'
import { formContext } from '../formContext'

export function useForm() {
  return useContext(formContext) as Form
}
