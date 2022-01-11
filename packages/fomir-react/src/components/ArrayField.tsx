import React from 'react'

export const ArrayField = ({ children, node }: any) => {
  return (
    <div>
      <div>{node.label}</div>
      {children}
    </div>
  )
}
