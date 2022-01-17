import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useFormState, useForm } from 'fomir-react'

const Home: NextPage = () => {
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
      setTimeout(() => {
        form.setSubmitting(false)
      }, 3000)
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
        type: 'Submit',
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
