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
  const [, forceUpdate] = useState({})
  const form = useForm()
  const { updaterMap } = form
  const { name } = node

  useMemo(() => {
    updaterMap.set(node, forceUpdate)
  }, [])

  useEffect(() => {
    form.onFieldInit(name)
    return () => {
      updaterMap.delete(node)
    }
  }, [])

  const nodeName = form.getNodeName(node)
  if (nodeName) {
    form.NAME_TO_NODE.set(nodeName, node)
    form.NODE_TO_NAME.set(node, nodeName)
  }

  const handler = {
    handleChange: (e: ChangeEvent) => form.change(nodeName, getValueFormEvent(e)),
    handleBlur: () => form.blur(name),
  }

  if (typeof node.visible === 'boolean' && !node.visible) return null

  const Cmp = getComponent(node)
  return createElement(Cmp, { node, handler, children })
}
