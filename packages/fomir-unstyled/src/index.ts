import { FomirPlugin } from 'fomir'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'
import { Checkbox } from './components/Checkbox'
import { RadioGroup } from './components/RadioGroup'
import { CheckboxGroup } from './components/CheckboxGroup'
import { Select } from './components/Select'
import { Submit } from './components/Submit'

export const FomirUnstyled: FomirPlugin = {
  components: {
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    CheckboxGroup,
    Select,
    Form,
    Submit,
  },
}

export default FomirUnstyled

export * from './ustyled-node'
