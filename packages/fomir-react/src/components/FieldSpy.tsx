import React, { FC, Fragment, useEffect, useState } from 'react'
import { useFormContext } from '../formContext'
import { FieldSpyProps } from '../types'

export const FieldSpy: FC<FieldSpyProps> = ({ name, children }) => {
  const [, forceUpdate] = useState({})
  const names = Array.isArray(name) ? name : [name]

  const form = useFormContext()

  useEffect(() => {
    const { data } = form

    if (!data.fieldSpyUpdaterMap) data.fieldSpyUpdaterMap = new Map<string[], any>()
    data.fieldSpyUpdaterMap.set(names, forceUpdate)
    return () => {
      data.fieldSpyUpdaterMap.delete(names)
    }
  }, [])

  const states = names.map((name) => form.getFieldState(name))
  if (!states?.[0]) return null // TODO: don't return null
  return <Fragment>{children(...states)}</Fragment>
}
