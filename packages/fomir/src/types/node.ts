import { FC, ReactNode } from 'react'
import { ExtendedType } from './custom-types'

interface FieldHandlers {
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

interface NodeProps<T extends Node = any> {
  node: T & { type: any }
  handler: FieldHandlers
  children?: ReactNode
}

export interface BaseNode {
  // children?: (Node | FieldNode)[]

  updaters?: ((...args: any[]) => void)[]
  component?: FC<NodeProps>
}

export type Node = ExtendedType<'Node', BaseNode>
