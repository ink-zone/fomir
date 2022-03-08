import { FomirPlugin } from 'fomir'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
import { RadioGroup } from './fields/RadioGroup'
import { Checkbox } from './fields/Checkbox'
import { CheckboxGroup } from './fields/CheckboxGroup'
import { Switch } from './fields/Switch'
import { Select } from './fields/Select'
import { Reset } from './fields/Reset'
import { Box } from './fields/Box'
import { Submit } from './fields/Submit'

export type { BoneUINode } from './bone-ui-node'

export const FomirBoneUI: FomirPlugin = {
  components: {
    Form,
    Input,
    Checkbox,
    Switch,
    RadioGroup,
    CheckboxGroup,
    Textarea,
    Select,
    Reset,
    Submit,
    Box,
  },
}

export default FomirBoneUI
