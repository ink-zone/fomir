import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm, Node } from 'fomir'

const Home: NextPage = () => {
  const form = createForm({
    type: 'form',
    onSubmit(values) {
      console.log('values', values)
    },

    // onFormChange: () => {
    //   return {
    //     '*': (data) => {
    //       console.log('* change', data)
    //     },
    //   }
    // },

    onFieldChange: () => {
      return {
        'foo.value': (data) => {
          console.log('first name', data, form.schema)
        },
      }
    },
    children: [
      {
        label: 'Checked?',
        name: 'checked',
        type: 'Checkbox',
        value: false,
        onValueChange: ({ value, setFieldState }) => {
          setFieldState('foo', { disabled: value })
        },
      },
      {
        label: 'Foo',
        name: 'foo',
        type: 'Input',
        value: 'fo',
        // onValueChange: ({ setFieldState }) => {
        //   setFieldState('bar', {
        //     value: 'I am show if foo disabled',
        //   })
        // },
      },
      {
        label: 'Bar',
        name: 'bar',
        type: 'Input',
        value: '',
        validator: {
          required: 'required...',
        },
      },
      {
        type: 'submit',
        text: 'submit',
      },
    ],
  })

  return (
    <Box p-100>
      <Box>Fomir</Box>
      <Form form={form} />
    </Box>
  )
}

export default Home
