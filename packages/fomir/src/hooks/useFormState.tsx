import { useEffect, useState } from 'react'
import { useFormContext } from './useFormContext'

export function useFormState() {
  const [, forceUpdate] = useState({})
  const form = useFormContext()

  useEffect(() => {
    form.formUpdaters.push(forceUpdate)
    return () => {
      const index = form.formUpdaters.indexOf(forceUpdate)
      form.formUpdaters.splice(index, 1)
    }
  }, [])

  return form.schema
}
