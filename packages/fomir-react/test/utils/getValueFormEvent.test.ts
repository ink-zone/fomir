import { ChangeEvent } from 'react'
import { getValueFormEvent } from '../../src/utils/getValueFormEvent'

test('raw value', () => {
  expect(getValueFormEvent(10)).toEqual(10)
})

test('common input change event', () => {
  const e = {
    target: {
      value: 'Hi',
    },
  } as ChangeEvent<HTMLInputElement>
  expect(getValueFormEvent(e)).toEqual('Hi')
})

test('checkbox change event', () => {
  const e = {
    target: {
      value: 'Hi',
      checked: true,
      type: 'checkbox',
    },
  } as ChangeEvent<HTMLInputElement>
  expect(getValueFormEvent(e)).toEqual(true)
})
