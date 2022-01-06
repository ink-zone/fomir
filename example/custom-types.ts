import { UnstyledNode } from 'fomir-unstyled'

export interface SubmitNode {
  type: 'submit'
  text: string
}

declare module 'fomir' {
  interface CustomTypes {
    Node: SubmitNode | UnstyledNode
  }
}
