import React from 'react'
import { FormField } from '../FormField'
import { Button } from '@bone-ui/button'
import { NodeProps, useFormContext } from 'fomir-react'

export const Reset = ({ node }: NodeProps) => {
  const { text, componentProps } = node
  const form = useFormContext()
  return (
    <FormField>
      <Button type="submit" {...componentProps} onClick={() => form.resetForm()}>
        {text}
      </Button>
    </FormField>
  )
}
