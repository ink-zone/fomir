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
        label: 'Have some advice?',
        name: 'advice',
        type: 'Checkbox',
        value: false,
        onValueChange: ({ value }) => {
          form.setFieldState('myAdvice', { visible: !!value })
        },
      },
      {
        label: 'My advice',
        name: 'myAdvice',
        type: 'Textarea',
        visible: false,
        value: '',
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
