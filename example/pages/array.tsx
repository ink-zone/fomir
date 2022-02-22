import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm, useFormContext } from 'fomir-react'

const Up = ({ node }) => {
  const form = useFormContext()
  const index = form.getNodeIndex(form.getParent(node))
  const helper = form.getArrayHelpers('friends')
  return (
    <button type="button" onClick={() => helper.swap(index, index - 1)}>
      up
    </button>
  )
}

const Down = ({ node }) => {
  const form = useFormContext()
  const index = form.getNodeIndex(form.getParent(node))
  const helper = form.getArrayHelpers('friends')
  return (
    <button type="button" onClick={() => helper.swap(index, index + 1)}>
      down
    </button>
  )
}

const Delete = ({ node }) => {
  const form = useFormContext()
  const index = form.getNodeIndex(form.getParent(node))
  const helper = form.getArrayHelpers('friends')
  return (
    <button type="button" onClick={() => helper.remove(index)}>
      delete
    </button>
  )
}

const Add = ({ node }) => {
  const form = useFormContext()
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
}

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    components: {
      Up,
      Down,
      Delete,
      Add,
    },

    children: [
      {
        label: 'arr',
        component: 'Box',
        value: '',
        children: [
          {
            component: 'ArrayField',
            name: 'friends',
            label: 'Friends',
            id: 'field-array',
            initialValues: [{ firstName: '', lastName: '' }],
            children: ['Bill', 'job'].map((v, i) => ({
              component: 'ArrayFieldItem',
              children: [
                {
                  label: 'First Name',
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
                  component: 'Up',
                },
                {
                  component: 'Down',
                },
                {
                  component: 'Delete',
                },
              ],
            })),
          },

          {
            component: 'Add',
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
