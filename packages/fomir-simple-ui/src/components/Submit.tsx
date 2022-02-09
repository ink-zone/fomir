import React from 'react'
import { Box } from '@fower/react'
import { NodeProps } from 'fomir-react'

export const Submit = (props: NodeProps) => {
  return (
    <Box as="button" type="submit" bgBrand500 white px4 py2 rounded cursorPointer>
      {props.node.text}
    </Box>
  )
}
