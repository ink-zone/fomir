import { ChangeEvent, createElement, useCallback, useEffect, useMemo, useState } from 'react'
import { FieldNode, Fomir } from 'fomir'
import { useForm } from '../hooks/useForm'
import { FieldProps } from '../types'
import { getValueFormEvent } from '../utils'

function isComponent(cmp: any) {
  return typeof cmp === 'function'
}

function getComponent(field: FieldNode) {
  const type = (field as any).type
  if (isComponent(field.component)) return field.component
  if (Fomir.compenents[type]) return Fomir.compenents[type]
  if (!type) return 'input'
  return type
}

export function Field({ fieldNode: field }: FieldProps) {
  const { name } = field
  const [, forceUpdate] = useState({})
  const form = useForm()

  useMemo(() => {
    form.registerFieldUpdater(name, forceUpdate)
  }, [])

  useEffect(() => {
    form.onFieldInit(name)
  }, [])

  const handleBlur = useCallback(() => form.blur(name), [])
  const handleChange = useCallback((e: ChangeEvent) => form.change(name, getValueFormEvent(e)), [])

  const handler = { handleChange, handleBlur }

  if (!field.visible) return null

  const Cmp = getComponent(field)

  return createElement(Cmp, { ...field, ...handler })
}
