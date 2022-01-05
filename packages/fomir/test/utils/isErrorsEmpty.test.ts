import { isFormValid } from '../../src/isFormValid'

test('should be valid if errors is empty', () => {
  expect(isFormValid({})).toBeTruthy()
})

test('should be valid if errors property is falsy', () => {
  const errors = {
    firstName: null,
    lastName: undefined,
    bio: '',
  }
  expect(isFormValid(errors)).toBeTruthy()
})

test('should be invalid if errors is a normal object', () => {
  const errors = {
    firstName: 'required',
    lastName: 'required',
    age: 100,
  }
  expect(isFormValid(errors)).toBeFalsy()
})

test('valid nested erros', () => {
  const errors = {
    profile: {
      firstName: '',
      lastName: null,
      age: undefined,
    },
  }
  expect(isFormValid(errors)).toBeTruthy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: {
      firstName: 'required',
      lastName: 'required',
    },
  }
  expect(isFormValid(errors)).toBeFalsy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: [
      {
        firstName: 'required',
        lastName: 'required',
      },
    ],
  }
  expect(isFormValid(errors)).toBeFalsy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: [
      {
        firstName: '',
        lastName: '',
      },
    ],
  }
  expect(isFormValid(errors)).toBeTruthy()
})

test('no errors', () => {
  expect(isFormValid()).toBeTruthy()
})
