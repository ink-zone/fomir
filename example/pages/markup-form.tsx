import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm, Field } from 'fomir-react'

function BasicForm() {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
  })

  return (
    <Box p-100>
      <Form form={form}>
        <Field
          component="Input"
          label="First Name"
          name="firstName"
          validators={{ required: 'First Name is required' }}
        />
        <Field
          component="Input"
          label="Last Name"
          name="lastName"
          validators={{ required: 'Last Name is required' }}
        />
        <button>Submit</button>
      </Form>
    </Box>
  )
}

export default BasicForm
