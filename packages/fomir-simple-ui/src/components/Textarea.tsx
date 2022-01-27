import React from 'react'
import { Box } from '@fower/react'
import { NodeProps } from 'fomir-react'

export const Textarea = ({ node, handler }: NodeProps) => {
  const { value = '', disabled, label, error, touched } = node

  return (
    <Box>
      {label && <Box>{label}</Box>}
      <textarea disabled={disabled} value={value} onChange={handler.handleChange}></textarea>
      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
