import React from 'react'
import { FieldRegisterProps } from 'fomir-react'
import { Box } from '@fower/react'

export const Input = (props: FieldRegisterProps) => {
  const { value = '', disabled, label, error, touched, handleChange } = props
  return (
    <Box>
      {label && <Box as="span">{label}</Box>}
      <input type="text" disabled={disabled} onChange={handleChange} value={value} />
      {error && touched && <Box red500>{error}</Box>}
    </Box>
  )
}
