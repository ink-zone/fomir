import React, { FC, forwardRef, useMemo, useState } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { NodeComponent } from './NodeComponent'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, ...rest } = props
  const { submitForm, schema } = form
  const { children = [] } = schema
  const [, forceUpdate] = useState({})

  useMemo(() => {
    form.registerFormUpdater(forceUpdate)
  }, [])

  function renderElement(children: any[]): any {
    return children.map((item, index) => {
      if (item?.children?.length) {
        return (
          <NodeComponent key={index} node={item}>
            {renderElement(item?.children)}
          </NodeComponent>
        )
      }

      return <NodeComponent key={index} node={item} />
    })
  }

  function getNode() {
    const FomirForm = Fomir.compenents.Form
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
