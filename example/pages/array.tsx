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
        label: 'foo',
        name: 'foo',
        type: 'Input',
        value: '',
      },
      {
        type: 'array',
        name: 'friends',
        children: [
          {
            type: 'arrayItem',
            children: [
              {
                label: 'First Name',
                name: 'friends[0].firstName',
                type: 'Input',
                value: '',
              },
              {
                label: 'Last Name',
                name: 'friends[0].lastName',
                type: 'Input',
                value: '',
              },
            ],
          },
        ],
      },
      {
        type: 'submit',
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
