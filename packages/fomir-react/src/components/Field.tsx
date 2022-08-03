import { useEffect, useRef, FC, PropsWithChildren } from 'react'
import { Node } from 'fomir'
import { useNodeComponent } from '../hooks/useNodeComponent'
import { useFormContext } from '../hooks/useFormContext'

export const Field: FC<PropsWithChildren<Node & { name: string }>> = ({ children, ...props }) => {
  const form = useFormContext()
  const { schema, normalizeNode } = form
  const { current: node } = useRef(normalizeNode(props))

  // register field
  useEffect(() => {
    if (!Array.isArray(schema.children)) schema.children = []
    schema.children.push(node)
    const index = schema.children.indexOf(node)
    form.NODE_TO_INDEX.set(node, index)
    form.NODE_TO_PARENT.set(node, schema)
  }, [form, schema, node])

  const componentNode = useNodeComponent({ node, children })

  return componentNode
}
