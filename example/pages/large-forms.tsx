import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'
import { Node } from 'fomir'

const Home: NextPage = () => {
  const list = new Array(2000).fill(() => null)

  const nodes = list.map<Node>((_, i) => ({
    label: `field_${i}`,
    name: `field_${i}`,
    type: 'Input',
    value: '',
  }))

  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      ...nodes,
      {
        type: 'Submit',
        text: 'submit',
      },
    ],
  })

  return (
    <Box p-100>
      <h2>Large Forms</h2>
      <Form form={form} />
    </Box>
  )
}

export default Home
