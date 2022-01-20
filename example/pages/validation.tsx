import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        component: 'Input',
        label: 'First Name',
        name: 'firstName',
        value: '',
        validators: {
          required: 'Username is required',
          maxLength: [4, 'max len'],
        },
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: '',
        validators: {
          pattern: [/foo/, 'should contain foo'],
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
