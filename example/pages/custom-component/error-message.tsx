import { Form, NodeProps, useForm } from 'fomir-react'
import { Box } from '@fower/react'

function FormDemo() {
  const InputWithErrorMessage = ({ node, handler }: NodeProps) => {
    const { value, label, error, touched } = node
    return (
      <div>
        {label && <Box mb2>{label}</Box>}
        <input value={value} onChange={handler.handleChange} />
        {error && touched && <Box red500>{error}</Box>}
      </div>
    )
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      InputWithErrorMessage,
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'InputWithErrorMessage',
        value: '',
        validators: {
          required: 'First name is required',
          minLength: [6, 'Min length is 6'],
        },
      },
      {
        component: 'Submit',
        text: 'Submit',
      },
    ],
  })

  return <Form form={form} />
}

export default FormDemo
