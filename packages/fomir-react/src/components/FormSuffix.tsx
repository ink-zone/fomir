import { FormSchema } from 'fomir'
import { FC, ReactNode } from 'react'
import { useFormState } from '../hooks/useFormState'

type Props = {
  suffix: ReactNode | ((schema: FormSchema) => ReactNode)
}

export const FormSuffix: FC<Props> = ({ suffix }) => {
  const state = useFormState()

  if (typeof suffix === 'function') return suffix(state)
  return !!suffix ? suffix : null
}
