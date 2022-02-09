import { Form, NodeProps, useForm, useFormState } from 'fomir-react'

function FormDemo() {
  const SubmitButton = (props) => {
    const { submitting } = useFormState()
    return (
      <button type="submit" disabled={submitting}>
        {props.node.text}
        {submitting ? '...' : ''}
      </button>
    )
  }

  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
      setTimeout(() => {
        form.setSubmitting(false)
      }, 2000)
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
        text: 'Submit',
      },
    ],
  })

  return <Form form={form} />
}

export default FormDemo
