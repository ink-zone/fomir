import { useEffect, useState } from 'react'
import { useForm } from './useForm'

export function useFormState() {
  const [, forceUpdate] = useState({})
  const form = useForm()
  const formState = form.getFormState()

  useEffect(() => {
    form.formUpdaters.push(forceUpdate)
    return () => {
      const index = form.formUpdaters.indexOf(forceUpdate)
      form.formUpdaters.splice(index, 1)
    }
  }, [])

  return formState
}
