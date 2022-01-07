import { useEffect, useState } from 'react'
import { useForm } from './formContext'

export function useField(name: string) {
  const [, forceUpdate] = useState({})
  const form = useForm()
  const field = form.getFieldState(name)

  useEffect(() => {
    const { data } = form

    if (!data[name]) data[name] = []
    data[name].push(forceUpdate)

    return () => {
      //
    }
  }, [])

  return field
}
