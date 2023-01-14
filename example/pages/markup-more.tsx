import { Box } from '@fower/react'
import { Form, useForm, Field } from 'fomir'

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
        <h2>Basic Info</h2>
        <Box bgGray100 rounded p3 mb4>
          <Field component="Input" label="First Name" name="firstName" />
          <Field component="Input" label="Last Name" name="lastName" />
        </Box>

        <h2>Extra Info</h2>
        <Box bgGray100 rounded p3 mb4>
          <Field component="Input" label="Email" name="email" />
          <Field component="Textarea" label="Bio" name="bio" />
        </Box>

        <button>Submit</button>
      </Form>
    </Box>
  )
}

export default BasicForm
