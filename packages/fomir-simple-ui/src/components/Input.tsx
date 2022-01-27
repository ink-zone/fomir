import React from 'react'
import { NodeProps } from 'fomir-react'
import { Box } from '@fower/react'

export const Input = ({ node, handler }: NodeProps) => {
  const { value = '', disabled, label, error, touched } = node
  return (
    <Box mb2>
      {label && <Box mb2>{label}</Box>}
      <Box
        as="input"
        type="text"
        px2
        py2
        rounded
        outlineNone
        borderBrand500--focus
        border
        disabled={disabled}
        onChange={handler.handleChange}
        value={value}
        maxW-200
      />
      {error && touched && <Box red500>{error}</Box>}
    </Box>
  )
}
