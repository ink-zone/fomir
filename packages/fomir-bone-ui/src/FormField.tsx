import React, { FC, ReactNode } from 'react'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { forwardRef } from '@bone-ui/utils'
import { useFormContext } from 'fomir-react'

export interface FormFieldProps extends FowerHTMLProps<'div'> {
  label?: ReactNode

  error?: string
}

export const FormField: FC<FormFieldProps> = forwardRef((props: FormFieldProps, ref) => {
  const { children, error, label, ...rest } = props
  const { schema } = useFormContext()
  const { layout = 'vertical' } = schema

  return (
    <Box className="bone-form-field" ref={ref} relative flex mb6 {...rest}>
      {label && (
        <Box
          className="bone-form-field-label"
          text-16
          toCenterY
          pr-8
          w-100={layout === 'horizontal'}
          mb2={layout === 'vertical'}
          toRight={layout === 'horizontal'}
        >
          {label}
        </Box>
      )}
      <Box className="bone-form-field-control" column flex-1 relative>
        <Box toCenterY toLeft>
          {children}
        </Box>
        {error && (
          <Box h-1em red400 absolute bottom--1em left0 text="0.9em">
            {error}
          </Box>
        )}
      </Box>
    </Box>
  )
}) as any
