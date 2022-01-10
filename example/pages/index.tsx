import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useFormState } from 'fomir-react'
import { createForm, Node } from 'fomir'

const Home: NextPage = () => {
  const form = createForm({
    type: 'form',
    onSubmit(values) {
      console.log('values', values)
      setTimeout(() => {
        form.setSubmitting(false)
      }, 3000)
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
        onValueChange: ({ value }) => {
          form.setFieldState('foo', { disabled: value })
        },
      },
      {
        label: 'Foo',
        name: 'foo',
        type: 'Input',
        value: 'fo',
        onValueChange: () => {
          form.setFieldState('bar', {
            value: 'I am show if foo disabled',
          })
        },
      },
      {
        type: 'submit',
        text: 'submit',
        component: function Submit() {
          const { submitting } = useFormState()
          return <button type="submit">{submitting ? 'submit...' : 'submit'}</button>
        },
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
