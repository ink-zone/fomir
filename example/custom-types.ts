import { Node } from 'fomir'
import { UnstyledNode } from 'fomir-unstyled'

export interface SubmitNode {
  type: 'submit'
  text: string
}

export interface BoxNode {
  type: 'Box'
  text?: string
  children?: Node[]
}

declare module 'fomir' {
  interface CustomTypes {
    Node: SubmitNode | UnstyledNode | BoxNode
  }
}
