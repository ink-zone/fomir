import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm } from 'fomir-react'

const BasicForm: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: 'Foo',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: 'Bar',
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
