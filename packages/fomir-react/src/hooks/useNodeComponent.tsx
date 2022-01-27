import { ChangeEvent, createElement, useEffect, useState } from 'react'
import { NodeProps } from '../types'
import { getValueFormEvent } from '../utils/getValueFormEvent'
import { useFormContext } from './useFormContext'

/**
 * To get the NodeComponet to render
 * @param opt
 * @returns
 */
export function useNodeComponent(opt: Omit<NodeProps, 'handler'>) {
  const { node, children } = opt
  const [, forceUpdate] = useState({})
  const form = useFormContext()
  const { NODE_TO_UPDATER } = form

  useEffect(() => {
    NODE_TO_UPDATER.set(node, forceUpdate)
    setTimeout(() => {
      const nodeName = form.getNodeName(node)
      form.onFieldInit(nodeName)
      if (nodeName) {
        form.NAME_TO_NODE.set(nodeName, node)
        form.NODE_TO_NAME.set(node, nodeName)
      }
    }, 0)
    return () => {
      NODE_TO_UPDATER.delete(node)
    }
  })

  const handler = {
    handleChange: (e: ChangeEvent) => {
      const nodeName = form.getNodeName(node)
      form.change(nodeName, getValueFormEvent(e))
    },
    handleBlur: () => {
      const nodeName = form.getNodeName(node)
      form.blur(nodeName)
    },
  }

  if (typeof node.visible === 'boolean' && !node.visible) return null

  const Cmp = form.getNodeComponent(node)
  if (!Cmp) return null
  return createElement(Cmp, { node, handler, children })
}
