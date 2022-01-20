import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: 'Curry',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: 'Steve',
      },
      {
        component: 'Box',
        children: [
          {
            component: 'Submit',
            text: 'submit',
          },
          {
            component: 'Box',
            text: 'reset',
            component: function Reset() {
              return (
                <button type="reset" onClick={() => form.resetForm()}>
                  Reset
                </button>
              )
            },
          },
        ],
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
