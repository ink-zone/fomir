import React from 'react'

export const FieldArray = ({ children, node }: any) => {
  console.log('------:', node)

  return (
    <div>
      <div>{node.label}</div>
      {children}
    </div>
  )
}
