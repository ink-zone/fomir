import React, { FC, forwardRef, useEffect, useState } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { NodeComponent } from './NodeComponent'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, children, ...rest } = props
  const { submitForm, schema, NODE_TO_UPDATER } = form
  const [, forceUpdate] = useState({})

  useEffect(() => {
    NODE_TO_UPDATER.set(form, forceUpdate)
  }, [])

  function renderNode(node: any): any {
    if (node.children) {
      return node.children.map((item: any, index: number) => {
        form.NODE_TO_INDEX.set(item, index)
        form.NODE_TO_PARENT.set(item, node)

        item.renderChildren = renderNode
        return (
          <NodeComponent key={index} node={item}>
            {renderNode(item)}
          </NodeComponent>
        )
      })
    }

    // if is root node, render null
    if (form.isSchema(node)) return null

    return <NodeComponent node={node} />
  }

  function getNode() {
    const FomirForm = form.schema.components?.Form

    if (FomirForm)
      return (
        <FomirForm submitForm={submitForm} {...rest} ref={ref}>
          {renderNode(schema)}
          {children}
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
