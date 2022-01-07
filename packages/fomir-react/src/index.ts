import { Fomir } from 'fomir'

export * from './components/Form'
export * from './components/FormSpy'
export * from './components/Field'
export * from './formContext'
export * from './use-field'
export * from './utils'
export * from './types'

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
