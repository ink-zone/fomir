import { Fomir } from '../src/Fomir'
import { FomirPlugin } from '../src/types'

test('required fail', () => {
  const Input = () => {}
  const Form = () => {}

  const MyPlugin: FomirPlugin = {
    Fields: {
      Input,
    },
    Form,
    validators: {
      equalToFoo: (value, msg) => {
        return value === 'foo' ? undefined : msg
      },
    },
    getInitialFieldValue: () => {},
    async validate() {
      return {}
    },
  }

  Fomir.use(MyPlugin)
  /** validators */
  expect(Object.keys(Fomir.validators).length).toBe(1)
  expect(Object.keys(Fomir.validators)[0]).toBe('equalToFoo')

  /** Fields */
  expect(Object.keys(Fomir.Fields).length).toBe(1)
  expect(Object.keys(Fomir.Fields)[0]).toBe('Input')

  expect(Fomir.validators.length).toBe(1)
  expect(typeof Fomir.getInitialFieldValue).toBe('function')
})
