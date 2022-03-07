import React from 'react'
import { Box } from '@fower/react'
import { NodeProps, useFormContext } from 'fomir-react'

export const Textarea = ({ node, handler }: NodeProps) => {
  const { value = '', disabled, label, error, touched } = node
  const { schema } = useFormContext()
  const { layout = 'vertical' } = schema
  return (
    <Box>
      {label && (
        <Box mb2 mr2={layout !== 'vertical'}>
          {label}
        </Box>
      )}

      <Box
        as="textarea"
        disabled={disabled}
        value={value}
        onChange={handler.handleChange}
        px2
        py2
        rows={4}
        w={300}
        rounded
        outlineNone
        borderBrand500--focus
        border
        cursorNotAllowed--disabled
        opacity-75--disabled
      />
      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
