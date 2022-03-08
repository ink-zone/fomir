import React from 'react'
import { NodeProps } from 'fomir-react'
import { Button } from '@bone-ui/button'
import { FormField } from '../FormField'

export const Submit = ({ node }: NodeProps) => {
  const { text, componentProps } = node
  return (
    <FormField>
      <Button type="submit" {...componentProps}>
        {text}
      </Button>
    </FormField>
  )
}
