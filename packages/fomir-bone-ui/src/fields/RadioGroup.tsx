import React, { FC } from 'react'
import { NodeProps } from 'fomir-react'
import { RadioGroup as BoneRadioGroup, Radio } from '@bone-ui/radio'
import { FormField } from '../FormField'

export const RadioGroup: FC<NodeProps> = (props) => {
  const { value, error, label, options = [] } = props.node

  return (
    <FormField error={error} label={label}>
      <BoneRadioGroup value={value} onChange={props.handler.handleChange}>
        {options?.map((item: any) => (
          <Radio key={item.value} value={item.value}>
            {item.value}
          </Radio>
        ))}
      </BoneRadioGroup>
    </FormField>
  )
}
