export * from './Fomir'
export * from './createForm'
export * from './isFormValid'
export * from './builtinPlugin'
export * from './types/form'
export * from './types/field'
export * from './types/node'
export * from './types/custom-types'
export * from './types/types'

import { Fomir } from './Fomir'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
Fomir.use(builtinPlugin)
