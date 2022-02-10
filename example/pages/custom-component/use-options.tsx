import { Form, NodeProps, useForm } from 'fomir-react'
import { Box } from '@fower/react'

function FormDemo() {
  const Select = ({ node, handler }) => {
    const { label, disabled, options, value } = node
    return (
      <Box>
        {label && <Box>{label}</Box>}
        <select disabled={disabled} value={value} onChange={handler.handleChange}>
          {options?.map((item, i) => (
            <option key={i + item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Box>
    )
  }

  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    components: {
      Select,
    },

    children: [
      {
        label: 'You like a cat or dog?',
        name: 'type',
        component: 'Select',
        value: 'dog',
        options: [
          { label: 'Cat', value: 'cat' },
          { label: 'Dog', value: 'dog' },
        ],
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
