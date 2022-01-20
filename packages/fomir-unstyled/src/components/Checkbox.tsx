import React from 'react'
import { NodeProps } from 'fomir-react'
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
      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
