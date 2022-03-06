import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'
import { request } from '@peajs/request'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        component: 'Input',
        label: 'First Name',
        name: 'firstName',
        value: '',
        async onFieldInit() {
          form.setFieldState('firstName', {
            value: 'steve',
          })
        },
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
