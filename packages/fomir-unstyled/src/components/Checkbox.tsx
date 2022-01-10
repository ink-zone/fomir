import React, { useMemo } from 'react'
import { NodeProps } from 'fomir-react'
import { Box } from '@fower/react'
import { FieldNode } from 'fomir'

export const Checkbox = ({ node, handler }: NodeProps<FieldNode>) => {
  const { label, error, touched, value } = node

  const memoLabel = useMemo(() => label && <Box mr-8>{label}</Box>, [label])
  const memoError = useMemo(() => error && touched && <Box red50>{error}</Box>, [touched, error])
  return (
    <Box>
      <Box toLeft toCenterY>
        {memoLabel}
        <input type="checkbox" value={value} onChange={handler.handleChange} />
      </Box>
      {memoError}
    </Box>
  )
}
