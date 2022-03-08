import React, { FC } from 'react'
import { NodeProps } from 'fomir-react'
import { CheckboxGroup as BoneCheckboxGroup, Checkbox } from '@bone-ui/checkbox'
import { FormField } from '../FormField'

export const CheckboxGroup: FC<NodeProps> = (props) => {
  const { value, error, label, options = [] } = props.node

  return (
    <FormField error={error} label={label}>
      <BoneCheckboxGroup value={value} onChange={props.handler.handleChange}>
        {options.map((item: any) => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </BoneCheckboxGroup>
    </FormField>
  )
}
