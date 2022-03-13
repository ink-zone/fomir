/**
 * @see https://github.com/Kelin2025/nanoclone
 */
import { isValidElement } from 'react'

type PlainObject = Record<string | number | symbol, any>

function getType(payload: any): string {
  return Object.prototype.toString.call(payload).slice(8, -1)
}

function isPlainObject(payload: any): payload is PlainObject {
  if (getType(payload) !== 'Object') return false
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype
}

export function cloneDeep(target: any): any {
  /** is react element, do not traval */
  if (typeof target === 'object' && isValidElement(target)) {
    return target
  }

  if (Array.isArray(target)) return target.map((i) => cloneDeep(i))

  // if(target instanceof RegExp) return target

  if (!isPlainObject(target)) return target
  return Object.keys(target).reduce((carry, key) => {
    const val = target[key]
    carry[key] = cloneDeep(val)
    return carry
  }, {} as any)
}
