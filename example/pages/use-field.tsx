import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useField, useForm } from 'fomir-react'

const FirstName = ({ node, handler }: NodeProps) => {
  const { value } = node
  const lastName = useField('lastName')
  return (
    <div>
      <div>value: {value}</div>
      <div>lastName: {lastName.value}</div>
      <input value={value} onChange={handler.handleChange} />
    </div>
  )
}

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },
    components: {
      FirstName,
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'FirstName',
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

export default Home
