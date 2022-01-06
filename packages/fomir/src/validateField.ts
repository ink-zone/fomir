import isPromise from 'is-promise'
import { Fomir } from './Fomir'
import { FieldValidateOptions } from './types/types'

export async function validateSingleField(options: FieldValidateOptions): Promise<any> {
  let error: any = undefined
  const { validator = {} } = options.fieldState

  for (const validatorRule in validator) {
    if (!Fomir.validatorRules[validatorRule]) continue

    const { value } = options.fieldState
    const result = Fomir.validatorRules[validatorRule](value, validator[validatorRule], options)

    error = isPromise(result) ? await result : result

    if (error) break
  }

  return error
}
