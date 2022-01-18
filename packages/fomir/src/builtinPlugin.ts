import { FomirPlugin } from './types/types'

export const builtinPlugin: FomirPlugin = {
  validators: {
    required(value, msg) {
      // TODO: need improve
      if (value === 0) return ''
      return !value ? msg : ''
    },

    arrayNotEmpty(value: any[], msg) {
      return value.length > 0 ? '' : msg
    },

    pattern(value, [regex, msg]: [RegExp, string]) {
      return regex.test(value) ? '' : msg
    },

    min(value, [base, msg]) {
      return value >= base ? '' : msg
    },

    max(value, [base, msg]) {
      return value <= base ? '' : msg
    },

    minLength(value, [len, msg]) {
      return value?.length >= len ? '' : msg
    },

    maxLength(value, [len, msg]) {
      return value?.length <= len ? '' : msg
    },

    equalTo(value, validator, { form }) {
      const [prop, msg] = validator
      return form.getValues()?.[prop] === value ? '' : msg
    },
  },
}
