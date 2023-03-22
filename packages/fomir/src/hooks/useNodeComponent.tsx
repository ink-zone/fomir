import { ChangeEvent, createElement, useEffect, useState, useMemo } from 'react'
import { NodeProps } from '../types'
import { getValueFormEvent } from '../utils/getValueFormEvent'
import { useFormContext } from './useFormContext'

/**
 * To get the NodeComponent to render
 * @param opt
 * @returns
 */
export function useNodeComponent(opt: Omit<NodeProps, 'handler'>) {
  const { node, children } = opt
  const [, forceUpdate] = useState({})
  const form = useFormContext()
  const { NODE_TO_UPDATER, NAME_TO_NODE, NODE_TO_NAME } = form

  const nodeName = form.getNodeName(node)

  useEffect(() => {
    NAME_TO_NODE.set(nodeName, node)
    NODE_TO_NAME.set(node, nodeName)
    NODE_TO_UPDATER.set(node, forceUpdate)
    return () => {
      NODE_TO_UPDATER.delete(node)
    }
  }, [NODE_TO_UPDATER, node])

  /**
   * run onFieldInit function
   */
  useEffect(() => {
    const nodeName = form.getNodeName(node)
    setTimeout(() => {
      form.onFieldInit(nodeName, form)
    }, 0)
  }, [form, node])

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
  return createElement(Cmp, { node, handler }, children)
}
