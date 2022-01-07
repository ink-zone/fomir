import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useField } from 'fomir-react'
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
          const lastName = useField('lastName')
          console.log('lastName:', lastName)
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
