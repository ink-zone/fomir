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
        label: 'First Name',
        name: 'firstName',
        type: 'Input',
        value: '',
        onValueChange: ({ value }) => {
          form.setFieldState('firstName', {
            value: value.toUpperCase(),
          })
        },
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
