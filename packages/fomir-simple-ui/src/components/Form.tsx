import React, { forwardRef } from 'react'
import { FormRegisterProps } from 'fomir-react'

export const Form = forwardRef<HTMLFormElement, FormRegisterProps>(
  ({ children, submitForm }, ref) => {
    return (
      <form onSubmit={submitForm} ref={ref}>
        {children}
      </form>
    )
  },
)
