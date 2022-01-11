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
                    //
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
