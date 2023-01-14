import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir'
import { request } from '@peajs/request'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        component: 'Select',
        label: 'Todos',
        name: 'todo',
        value: '',
        async onFieldInit() {
          const todos = await request('https://jsonplaceholder.typicode.com/todos')

          form.setFieldState('todo', {
            options: todos.map((i) => ({
              label: i.title,
              value: i.id,
            })),
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
