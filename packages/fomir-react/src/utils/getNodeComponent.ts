import { Fomir, Node } from 'fomir'

export function getNodeComponent(field: Node) {
  const type = (field as any).type
  if (typeof field.component === 'function') return field.component
  if (Fomir.compenents[type]) return Fomir.compenents[type]
  if (!type) return 'input'
  return type
}
