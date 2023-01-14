import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm } from 'fomir'

const BasicForm: NextPage = () => {
  const Input = ({ node, handler }: NodeProps) => {
    const { value, label } = node
    return (
      <div>
        <div>{label}</div>
        <input value={value} onChange={handler.handleChange} />
      </div>
    )
  }

  const Submit = ({ node }: NodeProps) => {
    return <button>{node.text}</button>
  }

  interface Values {
    firstName: string
    lastName: string
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      Input, // register a component for this form
      Submit,
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: '',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: '',
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

export default BasicForm
