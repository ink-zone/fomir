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
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: 'Curry',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: 'Steve',
      },
      {
        component: 'Box',
        css: 'spaceX2 toCenterY',
        children: [
          {
            component: 'Submit',
            text: 'Submit',
          },
          {
            component: 'Reset',
            text: 'Reset',
          },
        ],
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
