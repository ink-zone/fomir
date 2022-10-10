import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      form.setSubmitting(true)
      setTimeout(() => {
        form.setSubmitting(false)
      }, 2000)
      console.log('values', values)
    },

    children: [
      {
        component: 'Input',
        // label: 'First Name',
        label: <Box>First Name</Box>,
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
    ],
  })

  return (
    <Box p-100>
      <Form
        form={form}
        suffix={({ submitting }) => {
          return (
            <Box as="button" type="submit" cursorPointer disabled={submitting}>
              Submit
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default Home
