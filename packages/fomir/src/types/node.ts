// import { FieldNode } from './field'
import { ExtendedType } from './custom-types'

export interface BaseNode {
  // children?: (Node | FieldNode)[]
}

export type Node = ExtendedType<'Node', BaseNode>
