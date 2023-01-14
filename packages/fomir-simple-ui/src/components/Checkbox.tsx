import React from 'react'
import { NodeProps } from 'fomir'
import { Box } from '@fower/react'
import { FieldNode } from 'fomir'

export const Checkbox = ({ node, handler }: NodeProps<FieldNode>) => {
  const { label, error, touched, value } = node

  return (
    <Box>
      <Box>
        {label && <Box>{label}</Box>}

        <input type="checkbox" value={value} onChange={handler.handleChange} />
      </Box>
      {error && touched && <Box red500>{error}</Box>}
    </Box>
  )
}
