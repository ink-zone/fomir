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
        label: 'First Name',
        name: 'firstName',
        type: 'Input',
        value: '',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        type: 'Input',
        value: '',
      },
      {
        type: 'Box',
        children: [
          {
            type: 'submit',
            text: 'submit',
          },
          {
            type: 'Box',
            text: 'reset',
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
