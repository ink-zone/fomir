import { SimpleUINode } from 'fomir-simple-ui'

declare module 'fomir' {
  interface CustomTypes {
    Node: SimpleUINode
  }
  interface Validators {
    isEmail?: 'string'
  }
}
