import React, { FC, forwardRef } from 'react'
import { FormRegisterProps, useFormContext } from 'fomir-react'
import { Box } from '@fower/react'

export const Form: FC<FormRegisterProps> = forwardRef<HTMLFormElement, FormRegisterProps>(
  function FormNode({ children, submitForm }, ref) {
    const form = useFormContext()
    const { layout = 'vertical' } = form.schema

    return (
      <Box
        as="form"
        className={`bone-ui-form-${layout}`}
        onSubmit={submitForm}
        ref={ref as any}
        display={layout === 'inline' ? 'flex' : 'block'}
        toCenterY={layout === 'inline'}
        spaceX5={layout === 'inline'}
        flexWrap={layout === 'inline'}
      >
        {children}
      </Box>
    )
  },
)
