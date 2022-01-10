import { Form } from 'fomir'
import { createContext } from 'react'

export const formContext = createContext({} as Form)

export const FormProvider = formContext.Provider
