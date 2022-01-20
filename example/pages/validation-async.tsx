import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    onError(errors) {
      console.log('error:', errors)
    },

    children: [
      {
        label: 'async',
        name: 'password',
        component: 'Input',
        value: '',
        validators: {
          async av(value: any) {
            return new Promise((resove) => {
              setTimeout(() => {
                resove('error....')
              }, 2000)
            })
          },
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
