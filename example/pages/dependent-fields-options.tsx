import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, useForm } from 'fomir'

const Home: NextPage = () => {
  const cats = [
    { label: 'American Bobtai', value: 'American Bobtai' },
    { label: 'Bengal', value: 'Bengal' },
    { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
  ]
  const dogs = [
    { label: 'Husky', value: 'Husky' },
    { label: 'Golden Retriever', value: 'Golden Retriever' },
    { label: 'Corgi', value: 'Corgi' },
    { label: 'Akita Inu', value: 'Akita Inu' },
  ]

  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'You like a cat or dog?',
        name: 'type',
        component: 'RadioGroup',
        value: '',
        options: [
          { label: 'Cat', value: 'cat' },
          { label: 'Dog', value: 'dog' },
        ],
        onValueChange: ({ value }) => {
          form.setFieldState('animal', {
            options: value === 'cat' ? cats : dogs,
            disabled: !value,
          })
        },
      },
      {
        label: 'Animal',
        name: 'animal',
        component: 'Select',
        options: [],
      },
      {
        component: 'Submit',
        text: 'submit',
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
