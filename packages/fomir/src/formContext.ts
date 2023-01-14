import { createContext } from 'react'
import { FormType } from './createForm'

export const formContext = createContext({} as FormType)

export const FormProvider = formContext.Provider
