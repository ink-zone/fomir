import React, {
  ChangeEvent,
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Fomir } from 'fomir'
import { useFormContext } from '../formContext'
import { FieldProps, FieldRenderProps } from '../types'
import { getValueFormEvent } from '../utils'

function isComponent(cmp: any) {
  return typeof cmp === 'function'
}

function getComponent(type: any) {
  if (!type) return 'input'
  if (isComponent(type)) return type
  if (Fomir.Fields[type]) return Fomir.Fields[type]
  return type
}

export function Field(props: FieldProps) {
  const { name } = props
  // exclude boolean props
  let { showLabel, touched, display, visible, pending, ...rest } = props
  const [, forceUpdate] = useState({})
  const form = useFormContext()

  useMemo(() => {
    form.registerField(name, forceUpdate)
  }, [])

  useEffect(() => {
    form.onFieldInit(name)
  }, [])

  const field = form.getFieldState(name)
  const { type } = field

  const handleBlur = useCallback(() => form.blur(name), [])
  const handleChange = useCallback((e: ChangeEvent) => {
    return form.change(name, getValueFormEvent(e))
  }, [])

  const renderProps: FieldRenderProps = {
    ...field,
    handleChange,
    handleBlur,
  }

  if (!field.visible) return null

  if (typeof props?.children === 'function') {
    return <Fragment>{props.children(renderProps)}</Fragment>
  }

  let fieldProps: any = { ...rest }
  const Cmp = getComponent(type)

  if (isComponent(Cmp)) {
    fieldProps = { ...fieldProps, ...field, ...renderProps }
  } else {
    fieldProps = {
      ...fieldProps,
      value: field.value,
      onChange: renderProps.handleChange,
      onBlur: renderProps.handleBlur,
    }
  }

  return createElement(Cmp, fieldProps)
}
