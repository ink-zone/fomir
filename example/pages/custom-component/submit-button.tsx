import { Form, NodeProps, useForm, useFormState } from 'fomir-react'
import { Box } from '@fower/react'

function FormDemo() {
  const SubmitButton = (props) => {
    return <button type="submit">{props.node.text}</button>
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      SubmitButton,
    },

    children: [
      {
        name: 'firstName',
        component: 'Input',
        value: 'Steve',
      },
      {
        component: 'SubmitButton',
        text: 'My Submit Button',
      },
    ],
  })

  return <Form form={form} />
}

export default FormDemo
