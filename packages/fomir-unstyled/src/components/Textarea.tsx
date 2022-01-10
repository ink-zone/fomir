import React from 'react'
import { Box } from '@fower/react'
import { FieldRegisterProps } from 'fomir-react'

export const Textarea = (props: FieldRegisterProps) => {
  const { value = '', disabled, label, error, touched, handleChange } = props

  return (
    <div>
      {label && <Box>{label}</Box>}
      <textarea disabled={disabled} value={value} onChange={handleChange}></textarea>
      {error && touched && <Box red50>{error}</Box>}
    </div>
  )
}
