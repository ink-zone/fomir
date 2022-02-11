import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'
import { useState } from 'react'

const Home: NextPage = () => {
  const [count, setCount] = useState(0)
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    watch: {
      '$.submitCount': (count) => {
        setCount(count)
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
      <div>count: {count}</div>
      <Form form={form} />
    </Box>
  )
}

export default Home
