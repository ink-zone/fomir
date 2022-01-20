import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    watch: {
      '$.submitCount': (count, prevCount) => {
        console.log('submitCount', count, prevCount)
      },
      'firstName.value': (data, prev) => {
        console.log('firstName change', data, prev)
      },

      'firstName.error': (data, prev) => {
        console.log('firstName error change', data, prev)
      },

      '*.value': (data, prev) => {
        console.log('values---', data, prev)
      },

      '*.error': (data, prev) => {
        console.log('error---', data, prev)
      },
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: '',
        validator: {
          // required: 'gogo',
        },
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
