import { useEffect, useState, useRef } from 'react'
import { FieldNode } from '../types'
import { useFormContext } from './useFormContext'

export function useFieldState<V = any>(name: string): Required<FieldNode> {
  const [, forceUpdate] = useState({})
  const form = useFormContext()
  const ref = useRef(form.getFieldState<V>(name))

  useEffect(() => {
    const { data } = form

    const field = form.getFieldState<V>(name)
    if (ref.current !== field) {
      ref.current = field
      forceUpdate({})
    }

    if (!data[name]) data[name] = []
    data[name].push(forceUpdate)

    return () => {
      const index = data[name].indexOf(forceUpdate)
      data[name].splice(index, 1)
    }
  }, [name, form])

  return ref.current
}
