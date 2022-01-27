import React from 'react'
import { Box } from '@fower/react'
import { NodeProps, useFormState } from 'fomir-react'
import { SubmitNode } from '../simple-ui-node'

export const Submit = (props: NodeProps<SubmitNode>) => {
  const { labelWidth } = useFormState()
  return (
    <Box
      as="button"
      type="submit"
      bgBrand500
      white
      px4
      py2
      rounded
      cursorPointer
      ml={labelWidth || 0}
    >
      {props.node.text}
    </Box>
  )
}
