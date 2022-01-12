import { toPath } from './toPath'

function hasOwnProperty(obj: any, prop: string) {
  if (obj == null) return false

  //to handle objects with null prototypes (too edge case?)
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function getKey(key: string) {
  const intKey = parseInt(key)
  if (intKey.toString() === key) {
    return intKey
  }
  return key
}

const hasShallowProperty = function (obj: any, prop: string) {
  return (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop)
}

function getShallowProperty(obj: any, prop: string) {
  if (hasShallowProperty(obj, prop)) {
    return obj[prop]
  }
}

export function setIn(obj: any, path: any, value: any, doNotReplace?: boolean): any {
  if (typeof path === 'number') {
    path = [path]
  }
  if (!path || path.length === 0) {
    return obj
  }
  if (typeof path === 'string') {
    path = toPath(path).join('.')
    return setIn(obj, path.split('.').map(getKey), value, doNotReplace)
  }
  const currentPath = path[0]
  const currentValue = getShallowProperty(obj, currentPath)
  if (
    currentPath === '__proto__' ||
    (currentPath === 'constructor' && typeof currentValue === 'function')
  ) {
    throw new Error("For security reasons, object's magic properties cannot be set")
  }
  if (path.length === 1) {
    if (currentValue === undefined || !doNotReplace) {
      obj[currentPath] = value
    }
    return currentValue
  }

  if (currentValue === undefined) {
    //check if we assume an array
    if (typeof path[1] === 'number') {
      obj[currentPath] = []
    } else {
      obj[currentPath] = {}
    }
  }

  return setIn(obj[currentPath], path.slice(1), value, doNotReplace)
}
