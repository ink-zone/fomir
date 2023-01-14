import React from 'react'
import { NodeProps } from 'fomir'
import { produce } from 'immer'
import { Box } from '@fower/react'

export const CheckboxGroup = ({ node, handler }: NodeProps) => {
  const { label, error, touched, options, loading, value = [] } = node

  if (value && !Array.isArray(value)) {
    throw new Error('Initial Value of CheckboxGroup should be an Array')
  }

  return (
    <Box>
      {label && <Box>{label}</Box>}
      <Box toLeft>
        {loading && <Box>loading...</Box>}
        {!loading &&
          options?.map((item) => (
            <Box as="label" key={item.value} toLeft toCenterY mr-16>
              <input
                type="checkbox"
                value={item.value}
                checked={value.includes(item.value)}
                onChange={(e) => {
                  const nextValue = produce(value, (draft: any) => {
                    if (e.target.checked) {
                      draft.push(item.value)
                    } else {
                      const index = draft.indexOf(item.value)
                      draft.splice(index, 1)
                    }
                  })
                  handler.handleChange(nextValue)
                }}
              />
              <Box as="span" ml-4>
                {item.value}
              </Box>
            </Box>
          ))}
      </Box>

      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
