import { BaseNode, Node } from 'fomir'
import { UnstyledNode } from 'fomir-unstyled'

export interface SubmitNode extends BaseNode {
  type: 'Submit'
  text: string
}

export interface BoxNode extends BaseNode {
  type: 'Box'
  text?: string
  children?: Node[]
}

declare module 'fomir' {
  interface CustomTypes {
    Node: SubmitNode | UnstyledNode | BoxNode
  }
  interface BaseValidator {
    min?: string
  }
}
