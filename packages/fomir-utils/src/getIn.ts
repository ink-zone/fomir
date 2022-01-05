import { toPath } from './toPath'

export function getIn(obj: any, key: string | string[], def?: any, p: number = 0) {
  const path = toPath(key)
  while (obj && p < path.length) {
    obj = obj[path[p++]]
  }
  return obj === undefined ? def : obj
}
