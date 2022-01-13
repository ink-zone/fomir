import React, { FC, useEffect } from 'react'
import { FieldNode } from 'fomir'
import { NodeComponent } from './NodeComponent'
import { useForm } from '../hooks/useForm'

export const Field: FC<FieldNode & { type: string }> = ({ children, ...props }) => {
  const { schema, normalizeNode } = useForm()

  // register field
  useEffect(() => {
    if (!Array.isArray(schema.children)) schema.children = []
    schema.children.push(normalizeNode(props))
  }, [])

  return <NodeComponent node={props} />
}
