import React from 'react'
import { NodeProps, useFormContext } from 'fomir-react'
import { Box } from '@fower/react'

export const Input = ({ node, handler }: NodeProps) => {
  const { value = '', disabled, label, error, touched } = node
  const { schema } = useFormContext()
  const { layout = 'vertical' } = schema
  return (
    <Box
      mb2={layout !== 'horizontal'}
      flexDirection={layout === 'vertical' ? 'column' : 'row'}
      toCenterY={layout !== 'vertical'}
    >
      {label && (
        <Box mb2 mr2={layout !== 'vertical'}>
          {label}
        </Box>
      )}
      <Box
        as="input"
        type="text"
        px2
        py2
        rounded
        outlineNone
        borderBrand500--focus
        border
        cursorNotAllowed--disabled
        opacity-75--disabled
        disabled={disabled}
        onChange={handler.handleChange}
        value={value}
        maxW-200
      />
      {error && touched && <Box red500>{error}</Box>}
    </Box>
  )
}
