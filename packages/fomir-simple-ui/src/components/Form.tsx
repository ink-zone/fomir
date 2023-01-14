import React, { forwardRef, PropsWithChildren } from 'react'
import { FormRegisterProps } from 'fomir'

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormRegisterProps>>(
  ({ children, submitForm }, ref) => {
    return (
      <form onSubmit={submitForm} ref={ref}>
        {children}
      </form>
    )
  },
)
