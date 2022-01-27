import React from 'react'
import { NodeProps } from 'fomir-react'
import { Box } from '@fower/react'
import { FieldNode } from 'fomir'

export const Select = ({ node, handler }: NodeProps<FieldNode>) => {
  const { label, error, disabled, touched, options, value } = node
  return (
    <Box>
      {label && <Box>{label}</Box>}
      <select disabled={disabled} value={value} onChange={handler.handleChange}>
        {options?.map((item, i) => (
          <option key={i + item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
