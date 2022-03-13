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
        // label: 'First Name',
        label: <Box>First Name---</Box>,
        name: 'firstName',
        value: '',
        validators: {
          required: 'Username is required',
          minLength: [6, 'Min length is 6'],
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
