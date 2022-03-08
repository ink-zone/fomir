import React, { ChangeEvent, FC } from 'react'
import { NodeProps } from 'fomir-react'
import { Switch as BoneSwitch } from '@bone-ui/switch'
import { FormField } from '../FormField'

export const Switch: FC<NodeProps> = (props) => {
  const { value, error, label, componentProps } = props.node

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.handler.handleChange(e.target.checked)
  }

  return (
    <FormField error={error}>
      <BoneSwitch {...componentProps} checked={value} onChange={handleChange}>
        {label}
      </BoneSwitch>
    </FormField>
  )
}
