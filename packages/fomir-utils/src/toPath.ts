const keysCache: any = {}
const keysRegex = /[.[\]]+/

export const toPath = (key: any): string[] => {
  if (key === null || key === undefined || !key.length) {
    return []
  }
  if (typeof key !== 'string') {
    throw new Error('toPath() expects a string')
  }
  if (keysCache[key] == null) {
    keysCache[key] = key.split(keysRegex).filter(Boolean)
  }
  return keysCache[key]
}
