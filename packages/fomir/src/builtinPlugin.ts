import { FomirPlugin } from './types'

export const builtinPlugin: FomirPlugin = {
  validators: {
    required(value, msg) {
      // TODO: need improve
      if (value === 0) return undefined
      return !value ? msg : undefined
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

    minLength(value, [len, msg]) {
      return value?.length >= len ? undefined : msg
    },

    maxLength(value, [len, msg]) {
      return value?.length <= len ? undefined : msg
    },

    equalTo(value, validator, { values }) {
      const [prop, msg] = validator
      return values?.[prop] === value ? undefined : msg
    },
  },
}
