import { FC } from 'react'
import { useNodeComponent } from '../hooks/useNodeComponent'
import { NodeProps } from '../types'

export const NodeComponent: FC<Omit<NodeProps, 'handler'>> = ({ node, children }) => {
  const componentNode = useNodeComponent({ node, children })
  return componentNode
}
