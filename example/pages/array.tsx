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
        name: 'friend_array',
        label: 'Friends',
        children: [
          {
            type: 'arrayItem',
            children: [
              {
                label: 'First Name',
                name: 'friends[0].firstName',
                type: 'Input',
                value: 'bill',
              },
              {
                label: 'Last Name',
                name: 'friends[0].lastName',
                type: 'Input',
                value: '',
              },
              {
                type: 'Box',
                component: function () {
                  return <button type="button"> up </button>
                },
              },
            ],
          },
          {
            type: 'arrayItem',
            children: [
              {
                label: 'First Name',
                name: 'friends[1].firstName',
                type: 'Input',
                value: 'bar',
              },
              {
                label: 'Last Name',
                name: 'friends[1].lastName',
                type: 'Input',
                value: '',
              },
              {
                type: 'Box',
                component: function () {
                  return <button type="button"> up </button>
                },
              },
            ],
          },
          {
            type: 'Box',
            component: function () {
              return <button> + </button>
            },
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
