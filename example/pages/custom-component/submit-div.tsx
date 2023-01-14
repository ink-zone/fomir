import { Form, NodeProps, useForm, useFormContext } from 'fomir'
import { Box } from '@fower/react'

function FormDemo() {
  const SubmitDiv = (props) => {
    const form = useFormContext()
    return (
      <div
        style={{
          background: '#ddd',
          padding: '8px',
          display: 'inline-block',
        }}
        onClick={() => form.submitForm()}
      >
        {props.node.text}
      </div>
    )
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      SubmitDiv,
    },

    children: [
      {
        name: 'firstName',
        component: 'Input',
        value: 'Steve',
      },
      {
        component: 'SubmitDiv',
        text: 'Submit with Div',
      },
    ],
  })

  return <Form form={form} />
}

export default FormDemo
