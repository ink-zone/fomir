import React from 'react'
import { Fragment } from 'react'
import { useFormState } from '../hooks/useFormState'
import { FormSuffixType } from '../types'

type Props = {
  suffix?: FormSuffixType
}

export const FormSuffix = ({ suffix }: Props) => {
  const state = useFormState()

  if (typeof suffix === 'function') return suffix(state)
  return <Fragment>{suffix ? suffix : null}</Fragment>
}
