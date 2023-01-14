import React from 'react'
import { Box } from '@fower/react'
import { NodeProps } from 'fomir'

export const Submit = ({ node }: NodeProps) => {
  return (
    <Box as="button" type="submit" bgBrand500 white px4 py2 rounded cursorPointer>
      {node.text}
    </Box>
  )
}
