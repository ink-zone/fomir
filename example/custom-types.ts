import { BaseNode, Node } from 'fomir'
import { UnstyledNode } from 'fomir-simple-ui'

export interface SubmitNode extends BaseNode {
  component: 'Submit'
  text: string
}

export interface BoxNode extends BaseNode {
  component: 'Box'
  text?: string
  children?: Node[]
}

declare module 'fomir' {
  interface CustomTypes {
    Node: SubmitNode | BoxNode | UnstyledNode
  }
  // interface Validator {
  //   foo?: 'string'
  // }
}
