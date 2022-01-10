import React from 'react'

export const FieldArray = ({ children, node }: any) => {
  return (
    <div>
      <div>{node.label}</div>
      {children}
    </div>
  )
}
