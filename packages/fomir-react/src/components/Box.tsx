import React from 'react'
import { Box as B } from '@fower/react'
import { NodeProps } from '..'

export const Box = ({ children }: NodeProps) => {
  return <B spaceX2>{children}</B>
}
