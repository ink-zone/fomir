import React, { FC, forwardRef, useMemo, useState } from 'react'
import { Fomir } from 'fomir'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { NodeComponent } from './NodeComponent'

export const Form: FC<FormProps> = forwardRef((props, ref) => {
  const { form, ...rest } = props
  const { submitForm, schema, updaterMap } = form
  const [, forceUpdate] = useState({})

  useMemo(() => {
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

    return <NodeComponent node={node} />
  }

  function getNode() {
    const FomirForm = Fomir.compenents.Form
    if (FomirForm)
      return (
        <FomirForm submitForm={submitForm} {...rest} ref={ref}>
          {renderElement(schema)}
        </FomirForm>
      )
    if (isNative) return props.children

    return React.createElement('form', { onSubmit: submitForm, ...rest, ref })
  }

  return <FormProvider value={form}>{getNode()}</FormProvider>
})
