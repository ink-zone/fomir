import { FormType } from '../createForm'
import { useContext } from 'react'
import { formContext } from '../formContext'

export function useFormContext() {
  return useContext(formContext) as FormType
}
