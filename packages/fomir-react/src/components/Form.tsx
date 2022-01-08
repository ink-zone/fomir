import React, { FC, forwardRef } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { Field } from './Field'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, ...rest } = props
  const { submitForm, schema } = form
  const { children = [] } = schema

  function renderElement(children: any[]): any {
    return children.map((item, index) => {
      if (Array.isArray(item?.children)) return renderElement(item?.children)
      if (item.name) return <Field key={index} fieldNode={item} />
      return (
        <button key={index} type="submit">
          {item.text}
        </button>
      )
    })
  }

  function getNode() {
    const FomirForm = Fomir.compenents.form
    if (FomirForm)
      return (
        <FomirForm submitForm={submitForm} {...rest} ref={ref}>
          {renderElement(children)}
        </FomirForm>
      )
    if (isNative) return props.children

    return React.createElement('form', { onSubmit: submitForm, ...rest, ref })
  }

  return <FormProvider value={form}>{getNode()}</FormProvider>
})
