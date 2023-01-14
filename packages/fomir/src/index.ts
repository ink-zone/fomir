import { Fomir } from './Fomir'
import { builtinPlugin } from './builtinPlugin'

export * from './Fomir'
export * from './createForm'
export * from './utils'
export * from './builtinPlugin'

export * from './components/Form'
export * from './components/Field'
export * from './components/FormSpy'
export * from './components/NodeComponent'

export * from './hooks/useFormContext'
export * from './hooks/useFieldState'
export * from './hooks/useFormState'
export * from './hooks/useForm'
export * from './formContext'
export * from './utils'
export * from './types'

//init built-in plugin
Fomir.use(builtinPlugin)

Fomir.use({
  onFieldChange(name, form) {
    const updaters: any[] = form.data[name] || []
    if (updaters.length) {
      for (const update of updaters) {
        update({})
      }
    }
  },

  // onFormStateChange(formStore) {
  //   const formSpyUpdaters: any[] = formStore.data.formSpyUpdaters || []
  //   for (const updater of formSpyUpdaters) {
  //     updater({})
  //   }
  // },
})
