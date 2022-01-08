import { ExtendedType } from './custom-types'

export interface BaseNode {
  // children?: (Node | FieldNode)[]
  component?: any
}

export type Node = ExtendedType<'Node', BaseNode>
