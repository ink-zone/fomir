import React, { FC } from 'react'
import { NodeProps } from 'fomir-react'
import { Textarea as BoneTextarea } from '@bone-ui/textarea'
import { FormField } from '../FormField'

export const Textarea: FC<NodeProps> = (props) => {
  const { value, error, label, componentProps } = props.node

  return (
    <FormField error={error} label={label}>
      <BoneTextarea
        placeholder={componentProps.placeholder}
        value={value}
        onChange={props.handler.handleChange}
      />
    </FormField>
  )
}
