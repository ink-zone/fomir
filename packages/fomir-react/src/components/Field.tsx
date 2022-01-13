import { FC, useEffect, useRef } from 'react'
import { FieldNode } from 'fomir'
import { useForm } from '../hooks/useForm'
import { useNodeComponent } from '../hooks/useNodeComponent'

export const Field: FC<FieldNode & { type: string }> = ({ children, ...props }) => {
  const { schema, normalizeNode } = useForm()
  const { current: node } = useRef(normalizeNode(props))

  // register field
  useEffect(() => {
    if (!Array.isArray(schema.children)) schema.children = []
    if (schema.children.indexOf(node) < 0) {
      schema.children.push(node)
    }

    return () => {
      const index = schema.children!.indexOf(node)
      schema.children?.slice(index, 1)
    }
  }, [])

  const componentNode = useNodeComponent({ node, children })
  return componentNode
}
