import { useEffect, useState } from 'react'
import { FieldNode } from 'fomir'
import { useFormContext } from './useFormContext'

export function useFieldState<V = any>(name: string): Required<FieldNode> {
  const [, forceUpdate] = useState({})
  const form = useFormContext()
  const field = form.getFieldState<V>(name)

  useEffect(() => {
    const { data } = form

    if (!data[name]) data[name] = []
    data[name].push(forceUpdate)

    return () => {
      const index = data[name].indexOf(forceUpdate)
      data[name].splice(index, 1)
    }
  }, [])

  return field
}
