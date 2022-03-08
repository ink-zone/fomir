import React, { ChangeEvent, FC } from 'react'
import { NodeProps } from 'fomir-react'
import { Checkbox as BoneCheckbox } from '@bone-ui/checkbox'
import { FormField } from '../FormField'

export const Checkbox: FC<NodeProps> = (props) => {
  const { value, error, label } = props.node

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.handler.handleChange(e.target.checked)
  }

  return (
    <FormField error={error} label={label}>
      <BoneCheckbox checked={value} onChange={handleChange} />
    </FormField>
  )
}
