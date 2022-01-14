import type { NextPage } from 'next'
import { Box } from '@fower/react'
import { Form, Field, FieldArray, FieldArrayItem } from 'fomir-react'
import { createForm } from 'fomir'
import { useEffect, useRef } from 'react'

const Home: NextPage = () => {
  const ref = useRef(
    createForm({
      onSubmit(values) {
        console.log('valuesx', values)
      },
    }),
  )

  useEffect(() => {
    ////xxsst
    ;(window as any).form = ref.current
  }, [])

  return (
    <Box p-100>
      <Form form={ref.current}>
        {/* <Field name="leen" label="Name" type="Input" value="name" /> */}
        <Box border p3 my3>
          <FieldArray
            name="friends"
            values={[
              { name: 'leen', age: 50 },
              { name: 'job', age: 40 },
            ]}
          >
            {({ fields, push, remove, move }) => (
              <Box>
                {fields.map((_, i) => (
                  <FieldArrayItem key={i} index={i}>
                    <Box toLeft spaceX2>
                      <Field name="name" label="Name" type="Input" value="" />
                      {/* <Field name="age" label="Age" type="Input" value="" /> */}

                      <Box as="button" onClick={() => move(i, i - 1)}>
                        up
                      </Box>
                      <Box as="button" onClick={() => push({})}>
                        down
                      </Box>
                      <Box as="button" onClick={() => remove(i)}>
                        delete
                      </Box>
                    </Box>
                  </FieldArrayItem>
                ))}
                <Box as="button" onClick={() => push({})}>
                  add
                </Box>
              </Box>
            )}
          </FieldArray>
        </Box>
        <button type="submit">submit</button>
      </Form>
    </Box>
  )
}

export default Home
