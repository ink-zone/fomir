import { Box } from '@fower/react'
import { mdx } from '@mdx-js/react'
import { Fomir } from 'fomir'
import { Form, useField, useForm, useFormContext, useFormState } from 'fomir-react'
import { FomirSimpleUI } from 'fomir-simple-ui'

Fomir.use(FomirSimpleUI)

export default {
  Fomir,
  Box,
  mdx,
  Form,
  useField,
  useForm,
  useFormContext,
  useFormState,
}
