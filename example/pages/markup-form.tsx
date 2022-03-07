import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm, Field } from 'fomir-react'

const BasicForm: NextPage = () => {
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
          name="firstName"
          label="First Name"
          validators={{ required: 'First Name is required' }}
        />
        <Field component="Input" name="lastName" label="Last Name" />
        <button>Submit</button>
      </Form>
    </Box>
  )
}

export default BasicForm
