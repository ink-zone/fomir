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
        label: 'arr',
        name: 'arr',
        type: 'Box',
        value: '',
        children: [
          {
            type: 'FieldArray',
            name: 'friend_array',
            label: 'Friends',
            children: [0, 1].map((i) => ({
              type: 'FieldArrayItem',
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
            })),
          },

          {
            type: 'Box',
            text: 'ao',
            component: function () {
              return (
                <button
                  type="button"
                  onClick={() => {
                    console.log('gogo....')
                    form.setSchema((s) => {
                      s.children.push({
                        type: 'Box',
                        component: function () {
                          return <button type="button"> added </button>
                        },
                      })
                    })
                  }}
                >
                  +
                </button>
              )
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
