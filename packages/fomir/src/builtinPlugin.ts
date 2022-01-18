import { FomirPlugin } from './types/types'

export const builtinPlugin: FomirPlugin = {
  validators: {
    required(value: any, validatorValue) {
      if (!validatorValue) return false
      return !!value
    },

    arrayNotEmpty(value: any[], validatorValue) {
      if (!validatorValue) return false
      return value.length > 0
    },

    pattern(value, regex: RegExp) {
      return regex.test(value)
    },

    min(value, base) {
      return value >= base
    },

    max(value, base) {
      return value <= base
    },

    minLength(value, len) {
      return value?.length >= len
    },

    maxLength(value, len) {
      return value?.length <= len
    },

    equalTo(value, prop, { form }) {
      return form.getValues()?.[prop] === value
    },
  },
}
