import { ChangeEvent, createElement, useEffect, useState } from 'react'
import { getNodeComponent, getValueFormEvent, NodeProps } from '..'
import { useForm } from './useForm'

/**
 * To get the NodeComponet to render
 * @param opt
 * @returns
 */
export function useNodeComponent(opt: Omit<NodeProps, 'handler'>) {
  const { node, children } = opt
  const [, forceUpdate] = useState({})
  const form = useForm()
  const { updaterMap } = form
  const { name } = node

  useEffect(() => {
    updaterMap.set(node, forceUpdate)
    form.onFieldInit(name)

    const nodeName = form.getNodeName(node)
    if (nodeName) {
      form.NAME_TO_NODE.set(nodeName, node)
      form.NODE_TO_NAME.set(node, nodeName)
    }
    return () => {
      updaterMap.delete(node)
    }
  }, [])

  const nodeName = form.getNodeName(node)
  const handler = {
    handleChange: (e: ChangeEvent) => form.change(nodeName, getValueFormEvent(e)),
    handleBlur: () => form.blur(name),
  }

  if (typeof node.visible === 'boolean' && !node.visible) return null

  const Cmp = getNodeComponent(node)
  return createElement(Cmp, { node, handler, children })
}
