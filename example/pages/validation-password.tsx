import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    onError(errors) {
      console.log('error:', errors)
    },

    children: [
      {
        label: 'Password',
        name: 'password',
        component: 'Input',
        value: '',
        validators: {
          required: 'should be required',
          // isNumber(value) {
          //   if (!/^\d+$/.test(value)) return 'should be number'
          // },
        },
      },
      {
        label: 'Password confirm',
        name: 'passwordConfirm',
        component: 'Input',
        value: '',
        validators: {
          equalTo: ['password', 'password should be same'],
        },
      },
      {
        component: 'Submit',
        text: 'submit',
      },
    ],
  })

  return (
    <Box p-100>
      <Form form={form} />
    </Box>
  )
}

export default Home
