import React from 'react'
import { NodeProps } from 'fomir-react'
import { Box } from '@fower/react'
import { FieldNode } from 'fomir'

export const Input = ({ node, handler }: NodeProps<FieldNode>) => {
  const { value = '', disabled, label, error, touched } = node
  return (
    <Box>
      {label && <Box as="span">{label}</Box>}
      <input type="text" disabled={disabled} onChange={handler.handleChange} value={value} />
      {error && touched && <Box red500>{error}</Box>}
    </Box>
  )
}
