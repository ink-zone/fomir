export function getValueFormEvent(e: any): any {
  if (e && typeof e === 'object' && e.target) {
    const { value, type, checked } = e.target
    return type === 'checkbox' ? checked : value
  }
  return e
}
