import { FC, useEffect, useRef } from 'react'
import { FieldNode } from 'fomir'
import { useForm } from '../hooks/useForm'
import { useNodeComponent } from '../hooks/useNodeComponent'
import { useFieldArrayItemContext } from '../fieldArrayItemContext'
import { useFieldArrayContext } from '../fieldArrayContext'

export const Field: FC<FieldNode & { type: string }> = ({ children, ...props }) => {
  const form = useForm()
  const { schema, normalizeNode } = form
  const arrayNode = useFieldArrayContext()
  const { current: node } = useRef(normalizeNode(props))
  const itemNode = useFieldArrayItemContext()
  console.log('arrayNode:', arrayNode, itemNode)

  // register field
  useEffect(() => {
    if (itemNode) {
      if (!Array.isArray(itemNode.children)) {
        itemNode.children = []
      }

      if (itemNode.children.indexOf(node) > -1) return

      itemNode.children.push(node)

      const index = itemNode.children.indexOf(node)
      form.NODE_TO_INDEX.set(node, index)
      form.NODE_TO_PARENT.set(node, itemNode)
    } else {
      if (!Array.isArray(schema.children)) schema.children = []
      schema.children.push(node)
      const index = schema.children.indexOf(node)
      form.NODE_TO_INDEX.set(node, index)
      form.NODE_TO_PARENT.set(node, schema)
    }
  }, [])

  const componentNode = useNodeComponent({ node, children })
  return componentNode
}
