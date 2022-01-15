import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useField, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        // type: 'Input',
        value: '',
        component: function CustomInput({ value, handleChange }: any) {
          const lastName = useField('lastName')
          return (
            <div>
              <div>value: {value}</div>
              <div>lastName: {lastName.value}</div>
              <input value={value} onChange={handleChange} />
            </div>
          )
        },
      },
      {
        label: 'Last Name',
        name: 'lastName',
        type: 'Input',
        value: '',
      },
      {
        type: 'Submit',
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
