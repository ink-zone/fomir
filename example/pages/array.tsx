import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    type: 'form',
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'foo',
        name: 'foo',
        component: 'Input',
        value: '',
      },
      {
        label: 'arr',
        component: 'Box',
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
                  name: `firstName`,
                  component: 'Input',
                  value: v,
                },

                {
                  label: 'Last Name',
                  name: `lastName`,
                  component: 'Input',
                  value: v,
                },
                {
                  component: 'Box',
                  component: function ({ node }) {
                    const index = form.getNodeIndex(form.getParent(node))
                    const helper = form.getArrayHelpers('friends')
                    return (
                      <button type="button" onClick={() => helper.swap(index, index - 1)}>
                        up
                      </button>
                    )
                  },
                },
                {
                  component: 'Box',
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
                  component: 'Box',
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
            component: 'Box',
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
