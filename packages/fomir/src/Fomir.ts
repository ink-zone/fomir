import { FomirPlugin, OnFormStateChange, OnFieldStateChange } from './types/types'

export class Fomir {
  static compenents: Record<string, any> = {}
  static validators: Record<string, any> = {}

  static onFormStateChangeCallbacks: OnFormStateChange[] = []
  static onFieldChangeCallbacks: OnFieldStateChange[] = []

  static use = (plugin: FomirPlugin) => {
    const { onFormStateChange, onFieldChange } = plugin

    Fomir.compenents = {
      ...Fomir.compenents,
      ...plugin.components,
    }

    Fomir.validators = {
      ...Fomir.validators,
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
