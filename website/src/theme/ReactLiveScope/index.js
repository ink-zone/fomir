import React from 'react'
import { Box } from '@fower/react'
import { mdx } from '@mdx-js/react'
import { Fomir } from 'fomir'
import { Form, Field, useFieldState, useForm, useFormContext, useFormState } from 'fomir'
// import { FomirSimpleUI } from 'fomir-simple-ui'
// Fomir.use(FomirSimpleUI)

import { FomirBoneUI } from 'bone-ui'
Fomir.use(FomirBoneUI)


// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Fomir,
  Box,
  mdx,
  Form,
  Field,
  useFieldState,
  useForm,
  useFormContext,
  useFormState,
}

export default ReactLiveScope
