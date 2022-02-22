import { SimpleUINode } from 'fomir-simple-ui'
import { type } from 'os'

type CustomNode = SimpleUINode

declare module 'fomir' {
  interface CustomTypes {
    Node:
      | CustomNode
      | {
          component: CustomNode['component'] | ({} & string)
          [key: string]: any
        }
  }
  interface Validators {
    isEmail?: 'string'
  }
}
