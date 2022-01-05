export * from './Fomir'
export * from './createForm'
export * from './types'
export * from './isFormValid'
export * from './builtinPlugin'
export * from './validateField'
export { FormNode } from './interfaces/form'
export { FieldNode } from './interfaces/field'

import { Fomir } from './Fomir'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
Fomir.use(builtinPlugin)
