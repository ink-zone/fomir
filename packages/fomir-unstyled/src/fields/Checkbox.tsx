import React, { useMemo } from 'react'
import { FieldRegisterProps } from 'fomir-react'
import { Box } from '@fower/react'

export const Checkbox = (props: FieldRegisterProps) => {
  const { label, error, touched, value, handleChange } = props

  const memoLabel = useMemo(() => label && <Box mr-8>{label}</Box>, [label])
  const memoError = useMemo(() => error && touched && <Box red50>{error}</Box>, [touched, error])
  return (
    <Box>
      <Box toLeft toCenterY>
        {memoLabel}
        <input type="checkbox" value={value} onChange={handleChange} />
      </Box>
      {memoError}
    </Box>
  )
}
