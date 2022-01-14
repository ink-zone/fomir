import { createContext, useContext } from 'react'

export const fieldArrayContext = createContext(null as any)

export const FieldArrayProvider = fieldArrayContext.Provider

export function useFieldArrayContext() {
  return useContext(fieldArrayContext) as any
}
