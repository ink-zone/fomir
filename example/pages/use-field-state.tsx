import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useFieldState, useForm } from 'fomir-react'

const NameValue = () => {
  const { value } = useFieldState('userName')
  return <div>Name: {value}</div>
}

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    // register component
    components: {
      NameValue,
    },

    children: [
      {
        component: 'NameValue',
      },
      {
        name: 'userName',
        component: 'Input',
        value: 'Bill',
      },
      {
        component: 'Submit',
        text: 'submit',
      },
    ],
  })

  return <Form form={form} />
}

export default Home
