import type { NextPage } from 'next'
import { Form, useFieldState, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const NameValue = () => {
    const { value } = useFieldState<string>('userName')
    return <div>Name: {value}</div>
  }
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
      { component: 'NameValue' },
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
