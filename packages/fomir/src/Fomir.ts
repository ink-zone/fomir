import { FormNode } from './types/form'
import { FomirPlugin } from './types/types'

export class Fomir {
  static Form: any = null
  static Fields: any = {}
  static validatorRules: Record<string, any> = {}
  static forms: Record<string, FormNode> = {}

  static use = (plugin: FomirPlugin) => {
    const { Form } = plugin
    if (Form) Fomir.Form = Form

    Fomir.Fields = {
      ...Fomir.Fields,
      ...plugin.Fields,
    }

    Fomir.validatorRules = {
      ...Fomir.validatorRules,
      ...plugin.validators,
    }
  }
}

export const use = Fomir.use
