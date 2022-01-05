import React, { FC, forwardRef } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { Field } from './Field'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, ...rest } = props
  const { submitForm } = form
  const { children = [] } = props.form.schema

  function renderElement(children: any[]): any {
    return children.map((item, index) => {
      if (Array.isArray(item?.children)) return renderElement(item?.children)
      if (item.name) return <Field key={index} {...item} />
      return (
        <button key={index} type="submit">
          {item.text}
        </button>
      )
    })
  }

  function getNode() {
    if (Fomir.Form)
      return (
        <Fomir.Form submitForm={submitForm} {...rest} ref={ref}>
          {renderElement(children)}
        </Fomir.Form>
      )
    if (isNative) return props.children

    return React.createElement('form', { onSubmit: submitForm, ...rest, ref })
  }

  return <FormProvider value={form}>{getNode()}</FormProvider>
})
