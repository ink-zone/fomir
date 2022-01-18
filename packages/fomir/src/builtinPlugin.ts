import { FomirPlugin } from './types/types'

export const builtinPlugin: FomirPlugin = {
  validators: {
    required(value: any) {
      return !!value
    },

    arrayNotEmpty(value: any[], msg) {
      return value.length > 0 ? undefined : msg
    },

    pattern(value, [regex, msg]: [RegExp, string]) {
      return regex.test(value) ? undefined : msg
    },

    min(value, [base, msg]) {
      return value >= base ? undefined : msg
    },

    max(value, [base, msg]) {
      return value <= base ? undefined : msg
    },

    minLength(value, len) {
      return value?.length >= len
    },

    maxLength(value, len) {
      console.log('---x')
      return value?.length <= len
    },

    equalTo(value, validator, { form }) {
      const [prop, msg] = validator
      return form.getValues()?.[prop] === value ? undefined : msg
    },
  },
}
