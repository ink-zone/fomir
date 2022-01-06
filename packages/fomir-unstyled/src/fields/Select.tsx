import React from 'react'
import { FieldRegisterProps } from 'fomir-react'
import { Box } from '@fower/react'

export const Select = (props: FieldRegisterProps) => {
  const { label, error, disabled, touched, options, value, handleChange } = props
  return (
    <Box>
      {label && <Box>{label}</Box>}
      <select disabled={disabled} value={value} onChange={handleChange}>
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
