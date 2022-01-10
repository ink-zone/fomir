import { Fomir } from 'fomir'
import { FieldArrayItem } from './components/FieldArrayItem'
import { Box } from './components/Box'
import { FieldArray } from './components/FieldArray'

export * from './components/Form'
export * from './components/FormSpy'
export * from './components/NodeComponent'
export * from './hooks/useForm'
export * from './hooks/useField'
export * from './hooks/useFormState'
export * from './formContext'
export * from './utils'
export * from './types'

Fomir.use({
  components: {
    FieldArray,
    FieldArrayItem,
    Box,
  },
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
