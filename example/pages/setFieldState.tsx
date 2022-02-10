import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm, useFormContext } from 'fomir-react'

const Home: NextPage = () => {
  const SetName = () => {
    const form = useFormContext()
    return (
      <button
        onClick={() => {
          form.setFieldState('userName', { value: 'Bill' })
        }}
      >
        Set Name
      </button>
    )
  }

  const SetDisabled = () => {
    const form = useFormContext()
    return (
      <button
        onClick={() => {
          form.setFieldState('userName', { disabled: true })
        }}
      >
        Set Name
      </button>
    )
  }

  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },
    components: {
      SetName,
      SetDisabled,
    },

    children: [
      {
        label: 'User Name',
        name: 'userName',
        component: 'Input',
        value: 'Curry',
      },
      {
        component: 'Box',
        css: 'spaceX2 toCenterY',
        children: [
          {
            component: 'SetName',
          },
          { component: 'SetDisabled' },
        ],
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
