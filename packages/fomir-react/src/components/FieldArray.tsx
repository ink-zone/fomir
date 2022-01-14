import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { FieldArrayProvider } from '../fieldArrayContext'
import { Form } from 'fomir'

interface RenderProps extends ReturnType<Form['getArrayHelpers']> {
  fields: any[]
}

interface Props {
  name: string
  values: any[]
  children: (props: RenderProps) => ReactNode
}

export const FieldArray: FC<Props> = ({ name, values, children }) => {
  const [, forceUpdate] = useState({})
  const form = useForm()
  const { schema, normalizeNode, updaterMap } = form
  const { current: node } = useRef(
    normalizeNode({ type: 'FieldArray', name, values, fields: (values || []).map((_, i) => i) }),
  )

  useEffect(() => {
    updaterMap.set(node, forceUpdate)

    if (!Array.isArray(schema.children)) schema.children = []
    if (schema.children.indexOf(node) < 0) {
      schema.children.push(node)
      const index = schema.children.indexOf(node)
      form.NODE_TO_INDEX.set(node, index)
      form.NODE_TO_PARENT.set(node, schema)
    }

    return () => {
      updaterMap.delete(node)
    }
  }, [])

  const helper = form.getArrayHelpers('', node)

  const renderProps = {
    // fields: node.children?.length ? node.children : node.fields,
    fields: node.fields,
    ...helper,
  }

  // console.log('====================================', children(renderProps))

  return (
    <FieldArrayProvider value={node}>
      {typeof children === 'function' && children(renderProps)}
      {/* <div>gogo</div> */}
    </FieldArrayProvider>
  )
}
