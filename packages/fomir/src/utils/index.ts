export * from './toPath'
export * from './getIn'
export * from './setIn'
export * from './cloneDeep'
export * from './getValueFormEvent'

export const isNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative'
