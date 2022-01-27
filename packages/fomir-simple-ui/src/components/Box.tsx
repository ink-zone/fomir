import React from 'react'
import { Box as B } from '@fower/react'
import { css } from '@fower/core'
import { NodeProps } from 'fomir-react'
import { BoxNode } from '..'

export const Box = ({ children, node }: NodeProps<BoxNode>) => {
  return <B className={css(node.css || '')}>{children}</B>
}
