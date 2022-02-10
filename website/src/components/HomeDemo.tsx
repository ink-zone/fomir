import React from 'react'
import { Box } from '@fower/react'
import { HomeHighLight } from './HomeHighLight'

const code = `
  const form = useForm({
    onSubmit(values) {
      console.log('values', values)
    },
    children: [
      {
        name: 'firstName',
        component: 'Input',
      },
      {
        name: 'lastName',
        component: 'Input',
      },
      {
        component: 'Submit',
        text: 'submit',
      },
    ],
  })
`
export function HomeDemo() {
  return (
    <div className="home-demo">
      <Box className="bgOrange100 p6 roundedTopLarge toCenter flex">
        <Box className="toCenterY p3 w-240 bgWhite roundedHuge shadowMedium">
          <img className="circle-48" src="/img/logo.png" />
          <Box className="ml-10">
            <Box className="textLeft textXL fontBold">Fower</Box>
            <Box className="gray800">Atomic CSS in JS</Box>
          </Box>
        </Box>
      </Box>
      <Box className="textLeft">
        <HomeHighLight code={code} lang="js"></HomeHighLight>
      </Box>
    </div>
  )
}
