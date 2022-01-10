import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm } from 'fomir'

const Home: NextPage = () => {
  const form = createForm({
    type: 'form',
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
