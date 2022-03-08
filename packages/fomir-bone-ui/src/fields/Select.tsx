import React, { FC } from 'react'
import { NodeProps } from 'fomir-react'
import { Select as BoneSelect } from '@bone-ui/select'
import { FormField } from '../FormField'

export const Select: FC<NodeProps> = (props) => {
  const { value, error, label, componentProps, options = [] } = props.node

  return (
    <FormField error={error} label={label}>
      <BoneSelect
        {...componentProps}
        options={options}
        value={value}
        onChange={props.handler.handleChange}
      />
    </FormField>
  )
}
