import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm, nomalizeNode } from 'fomir'

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
            type: 'ArrayField',
            name: 'friends',
            label: 'Friends',
            id: 'field-array',
            children: ['Bill', 'job'].map((v, i) => ({
              type: 'ArrayFieldItem',
              children: [
                {
                  label: 'First Name',
                  name: `friends[${i}].firstName`,
                  type: 'Input',
                  value: v,
                },

                {
                  label: 'Last Name',
                  name: `friends[${i}].lastName`,
                  type: 'Input',
                  value: v,
                },
                {
                  type: 'Box',
                  component: function () {
                    return <button type="button"> up </button>
                  },
                },
                {
                  type: 'Box',
                  component: function () {
                    return <button type="button"> down </button>
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
                          type: 'ArrayFieldItem',
                          children: [
                            nomalizeNode({
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
                        rerender: true,
                        match: (n) => n.id === 'field-array',
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
