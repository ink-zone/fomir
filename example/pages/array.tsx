import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm, normalizeNode } from 'fomir'

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
        type: 'Box',
        value: '',
        children: [
          {
            type: 'ArrayField',
            name: 'friends',
            label: 'Friends',
            id: 'field-array',
            initialValues: [{ firstName: '', lastName: '' }],
            children: ['Bill', 'job'].map((v, i) => ({
              type: 'ArrayFieldItem',
              children: [
                {
                  label: 'First Name' + i,
                  // name: `friends[${i}].firstName`,
                  name: `firstName`,
                  type: 'Input',
                  value: v,
                },

                {
                  label: 'Last Name',
                  // name: `friends[${i}].lastName`,
                  name: `lastName`,
                  type: 'Input',
                  value: v,
                },
                {
                  type: 'Box',
                  component: function ({ node }: any) {
                    const index = form.getNodeIndex(form.getParent(node))
                    const helper = form.getArrayHelpers('friends')
                    console.log('====================================index:', index)
                    return (
                      <button type="button" onClick={() => helper.swap(index, index - 1)}>
                        up
                      </button>
                    )
                  },
                },
                {
                  type: 'Box',
                  component: function ({ node }: any) {
                    const index = form.getNodeIndex(form.getParent(node))
                    const helper = form.getArrayHelpers('friends')
                    return (
                      <button type="button" onClick={() => helper.swap(index, index + 1)}>
                        down
                      </button>
                    )
                  },
                },
                {
                  type: 'Box',
                  component: function ({ node }: any) {
                    const index = form.getNodeIndex(form.getParent(node))
                    const helper = form.getArrayHelpers('friends')
                    return (
                      <button type="button" onClick={() => helper.remove(index)}>
                        delete
                      </button>
                    )
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
                    const helper = form.getArrayHelpers('friends')
                    helper.push({})
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
