import React, { FC, forwardRef, useEffect, useMemo, useState } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { NodeComponent } from './NodeComponent'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, children, ...rest } = props
  const { submitForm, schema, updaterMap } = form
  const [, forceUpdate] = useState({})

  useMemo(() => {
    if (children) schema.children = []
  }, [])

  useEffect(() => {
    updaterMap.set(form, forceUpdate)
  }, [])

  function renderElement(node: any): any {
    if (node.children) {
      return node.children.map((item: any, index: number) => {
        form.NODE_TO_INDEX.set(item, index)
        form.NODE_TO_PARENT.set(item, node)

        item.renderElement = renderElement
        return (
          <NodeComponent key={index} node={item}>
            {renderElement(item)}
          </NodeComponent>
        )
      })
    }

    // if is root node, render null
    if (form.isSchema(node)) return null

    return <NodeComponent node={node} />
  }

  function getNode() {
    const FomirForm = Fomir.compenents.Form

    if (FomirForm)
      return (
        <FomirForm submitForm={submitForm} {...rest} ref={ref}>
          {children ? children : renderElement(schema)}
        </FomirForm>
      )
    if (isNative) return props.children

    return React.createElement('form', {
      onSubmit: submitForm,
      ...rest,
      ref,
    })
  }

  return <FormProvider value={form}>{getNode()}</FormProvider>
})
