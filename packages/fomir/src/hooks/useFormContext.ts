import { useContext } from 'react'
import { FormType } from '../createForm'
import { formContext } from '../formContext'

export function useFormContext() {
  return useContext(formContext) as FormType
}
