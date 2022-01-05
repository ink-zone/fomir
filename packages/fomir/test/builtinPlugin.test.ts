import { builtinPlugin } from '../src/builtinPlugin'

const { validators: validators = {} } = builtinPlugin
const { required, minLength, maxLength, min, max, arrayNotEmpty, pattern, equalTo } = validators

test('required fail', () => {
  const value = ''
  const options: any = {}
  const msg = 'required'
  expect(required(value, msg, options)).toEqual(msg)
})

test('required success', () => {
  const value = 'foo'
  const options: any = {}
  const msg = 'required'
  expect(required(value, msg, options)).toBeUndefined()
})

test('minLength fail', () => {
  const value = 'aaa'
  const options: any = {}
  const validatorValue = [6, 'should be length >= 6']
  expect(minLength(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('minLength success', () => {
  const value = 'aaaaaaaa'
  const options: any = {}
  const validatorValue = [6, 'should be length >= 6']
  expect(minLength(value, validatorValue, options)).toBeUndefined()
})

test('maxLength fail', () => {
  const value = 'aaaaaaaa'
  const options: any = {}
  const validatorValue = [6, 'should be length <= 6']
  expect(maxLength(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('maxLength success', () => {
  const value = 'aaa'
  const options: any = {}
  const validatorValue = [6, 'should be length <= 6']
  expect(maxLength(value, validatorValue, options)).toBeUndefined()
})

test('minLength with undefined', () => {
  const value = undefined
  const options: any = {}
  const validatorValue = [6, 'should be length >= 6']
  expect(minLength(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('maxLength with undefined', () => {
  const value = undefined
  const options: any = {}
  const validatorValue = [6, 'should be length <= 6']
  expect(maxLength(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('min fail', () => {
  const value = 5
  const options: any = {}
  const validatorValue = [10, 'value should be value >= 10']
  expect(min(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('min success', () => {
  const value = 20
  const options: any = {}
  const validatorValue = [10, 'value should be value >= 10']
  expect(min(value, validatorValue, options)).toBeUndefined()
})

test('max fail', () => {
  const value = 20
  const options: any = {}
  const validatorValue = [10, 'value should be value <= 10']
  expect(max(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('max success', () => {
  const value = 5
  const options: any = {}
  const validatorValue = [10, 'value should be length <= 10']
  expect(max(value, validatorValue, options)).toBeUndefined()
})

test('arrayNotEmpty fail', () => {
  const options: any = {}
  const msg = 'Array should not be empty'
  expect(arrayNotEmpty([], msg, options)).toEqual(msg)
})

test('arrayNotEmpty success', () => {
  const value = [1, 2, 3]
  const options: any = {}
  const msg = 'Array should not be empty'
  expect(arrayNotEmpty(value, msg, options)).toBeUndefined()
})

test('pattern fail', () => {
  const value = 'I am bar'
  const options: any = {}
  const validatorValue = [/foo/, 'should not be contain foo']
  expect(pattern(value, validatorValue, options)).toEqual(validatorValue[1])
})

test('pattern success', () => {
  const value = 'I am foo'
  const options: any = {}
  const validatorValue = [/foo/, 'should not be contain foo']
  expect(pattern(value, validatorValue, options)).toBeUndefined()
})

test('equalTo fail', () => {
  const password = '123456'
  const options: any = {
    values: {
      passwordConfirm: '11111',
    },
  }
  const validatorValue = ['passwordConfirm', 'Password should be same']
  expect(equalTo(password, validatorValue, options)).toEqual(validatorValue[1])
})

test('equalTo success', () => {
  const password = '123456'
  const options: any = {
    values: {
      passwordConfirm: '123456',
    },
  }
  const validatorValue = ['passwordConfirm', 'Password should be same']
  expect(equalTo(password, validatorValue, options)).toBeUndefined()
})

test('equalTo with undefined target prop', () => {
  const password = '123456'
  const options: any = {
    // values: {
    //   passwordConfirm: '123456',
    // },
  }
  const validatorValue = ['passwordConfirm', 'Password should be same']
  expect(equalTo(password, validatorValue, options)).toEqual(validatorValue[1])
})
