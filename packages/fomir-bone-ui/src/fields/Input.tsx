import React, { FC } from 'react'
import { NodeProps } from 'fomir-react'
import { Input as BoneInput } from '@bone-ui/input'
import { FormField } from '../FormField'

export const Input: FC<NodeProps> = (props) => {
  const { value, error, label, componentProps } = props.node

  return (
    <FormField error={error} label={label}>
      <BoneInput
        {...componentProps}
        type={componentProps.type || 'text'}
        value={value}
        onChange={props.handler.handleChange}
      />
    </FormField>
  )
}
