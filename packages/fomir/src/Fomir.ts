import { FormNode } from './types/form'
import { FomirPlugin, OnFormStateChange, OnFieldStateChange } from './types/types'

export class Fomir {
  static Form: any = null
  static Fields: any = {}
  static validatorRules: Record<string, any> = {}
  static forms: Record<string, FormNode> = {}

  static onFormStateChangeCallbacks: OnFormStateChange[] = []
  static onFieldChangeCallbacks: OnFieldStateChange[] = []

  static use = (plugin: FomirPlugin) => {
    const { Form, onFormStateChange, onFieldChange } = plugin
    if (Form) Fomir.Form = Form

    Fomir.Fields = {
      ...Fomir.Fields,
      ...plugin.Fields,
    }

    Fomir.validatorRules = {
      ...Fomir.validatorRules,
      ...plugin.validators,
    }

    if (onFormStateChange) {
      Fomir.onFormStateChangeCallbacks.push(onFormStateChange)
    }

    if (onFieldChange) {
      Fomir.onFieldChangeCallbacks.push(onFieldChange)
    }
  }
}

export const use = Fomir.use
