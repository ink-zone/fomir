import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm } from 'fomir'
import { useEffect } from 'react'

const BasicForm: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    watch: {
      'lastName.value': (value) => {
        console.log('lastName change:', value)
      },
    },
    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
      },
      {
        label: 'Last Name2',
        name: 'lastName2',
        component: 'Input',
      },
      {
        component: 'Submit',
        text: 'submit',
      },
    ],
  })

  useEffect(() => {
    setTimeout(() => {
      form.setValues({ firstName: 'Steve', lastName: 'Jobs' })
    }, 2000)
  }, [form])

  return (
    <Box p-100>
      <Form form={form} />
    </Box>
  )
}

export default BasicForm
