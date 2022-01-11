import React from 'react'

export const ArrayField = ({ node }: any) => {
  return (
    <div>
      <div>{node.label}</div>
      {node.renderElement(node)}
    </div>
  )
}
