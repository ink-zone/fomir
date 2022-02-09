import { Form, NodeProps, useForm } from 'fomir-react'
import { Box } from '@fower/react'

function FormDemo() {
  const DisabledInput = ({ node, handler }: NodeProps) => {
    const { value, disabled } = node
    return (
      <div>
        <input disabled={disabled} value={value} onChange={handler.handleChange} />
      </div>
    )
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      DisabledInput,
    },

    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'DisabledInput',
        disabled: true,
        value: 'Steve',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'DisabledInput',
        value: 'Jobs',
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
