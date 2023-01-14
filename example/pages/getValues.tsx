import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm, useFormState } from 'fomir'

const BasicForm: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

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
    ],
  })

  return (
    <Box p-100>
      <Form form={form} />
      <button
        onClick={() => {
          alert(JSON.stringify(form.getValues(), null, 2))
        }}
      >
        Get All Values
      </button>
      <button
        onClick={() => {
          alert(form.getValues('firstName'))
        }}
      >
        Get First Name
      </button>
    </Box>
  )
}

export default BasicForm
