import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, NodeProps, useForm, useFormState } from 'fomir-react'

const BasicForm: NextPage = () => {
  const Submit = ({ node }: NodeProps) => {
    const { submitting } = useFormState()
    return (
      <button>
        {node.text}
        {submitting ? '...' : ''}
      </button>
    )
  }

  const form = useForm({
    onSubmit(values) {
      setTimeout(() => {
        console.log('values', values)
        form.setSubmitting(false)
      }, 3000)
    },
    components: {
      Submit,
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: '',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: '',
      },
      {
        component: 'Submit',
        text: 'Submit',
      },
    ],
  })

  return (
    <Box p-100>
      <Form form={form} />
    </Box>
  )
}

export default BasicForm
