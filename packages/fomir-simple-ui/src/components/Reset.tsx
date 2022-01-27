import React from 'react'
import { Box } from '@fower/react'
import { NodeProps, useFormContext, useFormState } from 'fomir-react'
import { ResetNode } from '../simple-ui-node'

export const Reset = (props: NodeProps<ResetNode>) => {
  const { labelWidth } = useFormState()
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
      ml={labelWidth || 0}
      onClick={() => form.resetForm()}
    >
      {props.node.text}
    </Box>
  )
}
