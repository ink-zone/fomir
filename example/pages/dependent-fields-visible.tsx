import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'Have some advice?',
        name: 'advice',
        component: 'Checkbox',
        value: false,
        onValueChange: ({ value }) => {
          form.setFieldState('myAdvice', {
            visible: !!value,
          })
        },
      },
      {
        label: 'My advice',
        name: 'myAdvice',
        component: 'Input',
        visible: false,
        value: '',
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
