import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

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
        type: 'Input',
        value: '',
        validators: [{ required: true, message: 'should be required' }],
      },
      {
        label: 'Password confirm',
        name: 'passwordConfirm',
        type: 'Input',
        value: '',
        validators: [{ equalTo: 'password', message: 'password should be same' }],
      },
      {
        type: 'Submit',
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
