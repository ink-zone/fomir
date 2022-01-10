import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form } from 'fomir-react'
import { createForm } from 'fomir'

const Home: NextPage = () => {
  const form = createForm({
    type: 'form',
    onSubmit(values) {
      console.log('values', values)
    },

    children: [
      {
        label: 'You like a cat or dog?',
        name: 'type',
        type: 'RadioGroup',
        value: '',
        options: [
          { label: 'Cat', value: 'cat' },
          { label: 'Dog', value: 'dog' },
        ],
        onValueChange: ({ value }) => {
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
          form.setFieldState('animal', {
            options: value === 'cat' ? cats : dogs,
            disabled: !value,
          })
        },
      },
      {
        label: 'Animal',
        name: 'animal',
        type: 'Select',
        options: [],
      },
      {
        type: 'Submit',
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
