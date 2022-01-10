import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm, nomalizeField } from 'fomir'

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
            id: 'foo',
            children: [0].map((i) => ({
              type: 'FieldArrayItem',
              children: [
                {
                  label: 'First Name',
                  name: `friends[${i}].firstName`,
                  type: 'Input',
                  value: 'bill',
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
                    form.setNode(
                      (node) => {
                        console.log('node:', node)
                        node.children.push({
                          type: 'FieldArrayItem',
                          children: [
                            nomalizeField({
                              label: 'First Name',
                              name: 'gogo',
                              type: 'Input',
                              value: 'bill',
                            }),

                            {
                              type: 'Box',
                              component: function () {
                                return <button type="button"> up.. </button>
                              },
                            },
                          ],
                        })
                      },
                      {
                        match: (n) => n.id === 'foo',
                      },
                    )
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
