import { ChangeEvent, createElement, FC, useEffect, useMemo, useState } from 'react'
import { FieldNode, Fomir } from 'fomir'
import { useForm } from '../hooks/useForm'
import { NodeProps } from '../types'
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

export const NodeComponent: FC<Omit<NodeProps, 'handler'>> = ({ node, children }) => {
  const { name } = node
  const [, forceUpdate] = useState({})
  const form = useForm()
  const { updaterMap } = form

  useMemo(() => {
    updaterMap.set(node, forceUpdate)
  }, [])

  useEffect(() => {
    form.onFieldInit(name)
    return () => {
      updaterMap.delete(node)
    }
  }, [])

  const handler = {
    handleChange: (e: ChangeEvent) => form.change(name, getValueFormEvent(e)),
    handleBlur: () => form.blur(name),
  }

  // if (!node.visible) return null

  const Cmp = getComponent(node)
  return createElement(Cmp, { node, handler, children })
}
