import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm } from 'fomir'
import { useState } from 'react'

const Home: NextPage = () => {
  const form = createForm({
    type: 'form',
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        type: 'Input',
        value: '',
        component: function CustomInput({ value, handleChange }: any) {
          return <input value={value} onChange={handleChange} />
        },
      },
      {
        label: 'Last Name',
        name: 'lastName',
        type: 'Input',
        value: '',
      },
      {
        type: 'submit',
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
