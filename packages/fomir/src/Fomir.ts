import { FormNode } from './interfaces/form'
import { FomirPlugin, ValidateFn } from './types'

export class Fomir {
  static Form: any = null
  static Fields: any = {}
  static validators: ValidateFn[] = []
  static validatorRules: Record<string, any> = {}
  static forms: Record<string, FormNode> = {}

  static use = (plugin: FomirPlugin) => {
    const { validate, Form } = plugin
    if (Form) Fomir.Form = Form

    Fomir.Fields = {
      ...Fomir.Fields,
      ...plugin.Fields,
    }

    Fomir.validatorRules = {
      ...Fomir.validatorRules,
      ...plugin.validators,
    }

    if (validate && !Fomir.validators.includes(validate)) {
      Fomir.validators.push(validate)
    }
  }
}

export const use = Fomir.use
