import { FomirPlugin } from 'fomir'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
import { Checkbox } from './fields/Checkbox'
import { RadioGroup } from './fields/RadioGroup'
import { CheckboxGroup } from './fields/CheckboxGroup'
import { Select } from './fields/Select'

export const FomirUnstyled: FomirPlugin = {
  components: {
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    CheckboxGroup,
    Select,
    form: Form,
  },
}

export default FomirUnstyled

export * from './ustyled-node'
