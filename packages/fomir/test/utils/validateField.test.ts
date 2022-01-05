import { FieldState } from '../../src/types'
import { Fomir } from '../../src/Fomir'
import { builtinPlugin } from '../../src/builtinPlugin'
import { validateField } from '../../src/validateField'

beforeEach(() => {
  Fomir.use(builtinPlugin)
  Fomir.use({
    validators: {
      async asyncRequired(value, ruleValue) {
        return !value ? ruleValue : undefined
      },
    },
  })
})

test('single rule', () => {
  const requiredMsg = 'first Name is required'
  const fieldState = {
    value: '',
    validator: {
      required: requiredMsg,
    },
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(requiredMsg)
  })
})

test('multi validator', () => {
  const requiredMsg = 'first Name is required'
  const minLengthMsg = 'minLenght is 6'
  const fieldState = {
    value: 'hello',
    validator: {
      required: requiredMsg,
      minLength: [6, minLengthMsg],
    },
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(minLengthMsg)
  })
})

test('async rule', () => {
  const asyncRequiredMsg = 'first Name is required'
  const fieldState = {
    value: '',
    validator: {
      asyncRequired: asyncRequiredMsg,
    },
  } as any
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(asyncRequiredMsg)
  })
})

test('invalid rule', () => {
  const fieldState = {
    value: 'hello',
    validator: {
      notFoundRule: '',
    },
  } as any
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toBeUndefined()
  })
})

test('no validator', () => {
  const fieldState = {
    value: '',
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toBeUndefined()
  })
})
