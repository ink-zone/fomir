import { createContext, useContext } from 'react'

export const fieldArrayItemContext = createContext(null as any)

export const FieldArrayItemProvider = fieldArrayItemContext.Provider

export function useFieldArrayItemContext() {
  return useContext(fieldArrayItemContext) as any
}
