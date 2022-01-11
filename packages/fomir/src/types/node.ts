import { ExtendedType } from './custom-types'

export interface BaseNode {
  // children?: (Node | FieldNode)[]

  updaters: ((...args: any[]) => void)[]
  component?: any
}

export type Node = ExtendedType<'Node', BaseNode>
