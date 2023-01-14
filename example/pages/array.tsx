import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm, useFormContext } from 'fomir'

const ArrayField = ({ node }) => {
  return (
    <div>
      <div>{node.label}</div>
      {node.renderChildren?.(node)}
    </div>
  )
}

const ArrayFieldItem = ({ node }) => {
  return (
    <Box toCenterY spaceX2 mb2>
      {node.renderChildren?.(node)}
    </Box>
  )
}

const Up = ({ node }) => {
  const form = useFormContext()
  const index = form.getNodeIndex(form.getParent(node))
  const helper = form.getArrayHelpers('friends')
  return (
    <button
      type="button"
      disabled={helper.isFirst(index)}
      onClick={() => helper.swap(index, index - 1)}
    >
      up
    </button>
  )
}

const Down = ({ node }) => {
  const form = useFormContext()
  const index = form.getNodeIndex(form.getParent(node))
  const helper = form.getArrayHelpers('friends')
  return (
    <button
      type="button"
      disabled={helper.isLast(index)}
      onClick={() => helper.swap(index, index + 1)}
    >
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
      style={{ marginBottom: '8px' }}
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
    layout: 'horizontal',
    onSubmit(values) {
      console.log('values', values)
      alert(JSON.stringify(values, null, 2))
    },

    components: {
      ArrayField,
      ArrayFieldItem,
      Up,
      Down,
      Delete,
      Add,
    },

    children: [
      {
        component: 'Box',
        children: [
          {
            component: 'ArrayField',
            name: 'friends',
            isArrayField: true,
            children: [
              {
                component: 'ArrayFieldItem',
                children: [
                  {
                    label: 'First Name',
                    name: 'firstName',
                    component: 'Input',
                    value: 'Steve',
                  },
                  {
                    label: 'Last Name',
                    name: 'lastName',
                    component: 'Input',
                    value: 'Jobs',
                  },
                  { component: 'Up' },
                  { component: 'Down' },
                  { component: 'Delete' },
                ],
              },
            ],
          },

          { component: 'Add' },
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
