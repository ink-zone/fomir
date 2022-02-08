import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { mdx } from '@mdx-js/react'
import { Fomir } from 'fomir'
import { Form, useFieldState, useForm, useFormContext, useFormState } from 'fomir-react'
import { FomirSimpleUI } from 'fomir-simple-ui'

Fomir.use(FomirSimpleUI)

export default {
  useEffect,
  useState,
  Fomir,
  Box,
  mdx,
  Form,
  useFieldState,
  useForm,
  useFormContext,
  useFormState,
}
