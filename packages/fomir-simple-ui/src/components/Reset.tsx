import React from 'react'
import { Box } from '@fower/react'
import { NodeProps, useFormContext } from 'fomir'

export const Reset = (props: NodeProps) => {
  const form = useFormContext()
  return (
    <Box
      as="button"
      type="reset"
      bgBrand500
      white
      px4
      py2
      rounded
      cursorPointer
      onClick={() => form.resetForm()}
    >
      {props.node.text}
    </Box>
  )
}
