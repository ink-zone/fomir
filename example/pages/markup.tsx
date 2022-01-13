import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, Field } from 'fomir-react'
import { createForm } from 'fomir'
import { useEffect, useRef } from 'react'

const Home: NextPage = () => {
  const ref = useRef(
    createForm({
      onSubmit(values) {
        console.log('valuesx', values)
      },

      children: [
        {
          label: 'First Name',
          name: 'firstName',
          type: 'Input',
          value: '',
          validator: {
            required: 'Username is required',
            // maxLength: [4, 'max'],
            // pinCode: 'pin code',
          },
        },
        {
          label: 'Last Name',
          name: 'lastName',
          type: 'Input',
          value: '',
        },

        {
          type: 'Submit',
          text: 'submit',
        },
      ],
    }),
  )

  useEffect(() => {
    ////xxsst
    ;(window as any).form = ref.current
  }, [])

  return (
    <Box p-100>
      <Form form={ref.current}>
        <Field name="leen" label="Name" type="Input" value="name" />
        <button type="submit">submit</button>
      </Form>
    </Box>
  )
}

export default Home
