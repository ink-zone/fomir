import React, { FC, useEffect, useRef } from 'react'
import { useForm } from '..'
import { useFieldArrayContext } from '../fieldArrayContext'
import { FieldArrayItemProvider } from '../fieldArrayItemContext'

interface Props {
  index: number
}

export const FieldArrayItem: FC<Props> = ({ children }) => {
  const form = useForm()
  const { normalizeNode } = form
  const { current: node } = useRef(normalizeNode({ type: 'FieldArrayItem' }))

  const arrayNode = useFieldArrayContext()

  useEffect(() => {
    if (!Array.isArray(arrayNode.children)) arrayNode.children = []
    if (arrayNode.children.indexOf(node) > -1) return

    arrayNode.children.push(node)
    console.log('arrayNode:', arrayNode)

    const index = arrayNode.children.indexOf(node)
    form.NODE_TO_INDEX.set(node, index)
    form.NODE_TO_PARENT.set(node, arrayNode)
  }, [])
  return <FieldArrayItemProvider value={node}>{children}</FieldArrayItemProvider>
}
