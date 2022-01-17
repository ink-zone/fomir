import React from 'react'
import { NodeProps } from '../types'

export const ArrayField = ({ node }: NodeProps) => {
  return (
    <div>
      <div>{node.label}</div>
      {node.renderNode(node)}
    </div>
  )
}
