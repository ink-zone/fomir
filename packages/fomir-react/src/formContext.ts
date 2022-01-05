import { Form } from 'fomir'
import { createContext, useContext } from 'react'

export const formContext = createContext({} as Form)

export const FormProvider = formContext.Provider

export function useFormContext() {
  return useContext(formContext) as Form
}
