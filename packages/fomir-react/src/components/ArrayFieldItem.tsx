import React from 'react'
import { Box } from '@fower/react'
import { NodeProps } from '../types'

export const ArrayFieldItem = ({ children }: NodeProps) => {
  return (
    <Box toCenterY spaceX2>
      {children}
    </Box>
  )
}
