import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir'
import { useState } from 'react'

const Home: NextPage = () => {
  const [values, setValues] = useState({})
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    watch: {
      '*.value': (values) => {
        setValues(values)
      },

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
      <div>values:</div>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <Form form={form} />
    </Box>
  )
}

export default Home
