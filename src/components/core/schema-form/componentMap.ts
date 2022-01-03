/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
  Tree,
  Slider,
  Rate,
  Divider,
} from 'ant-design-vue';

// import RadioButtonGroup from './components/RadioButtonGroup.vue';
// import ApiSelect from './components/ApiSelect.vue';
// import ApiTreeSelect from './components/ApiTreeSelect.vue';
// import { BasicUpload } from '/@/components/Upload';
// import { StrengthMeter } from '/@/components/StrengthMeter';
// import { IconPicker } from '/@/components/Icon';
// import { CountdownInput } from '/@/components/CountDown';

const componentMap = {
  Input: Input,
  InputGroup: Input.Group,
  InputPassword: Input.Password,
  InputSearch: Input.Search,
  InputTextArea: Input.TextArea,
  InputNumber: InputNumber,
  AutoComplete: AutoComplete,

  // ApiSelect: ApiSelect,
  // ApiTreeSelect: ApiTreeSelect,
  // RadioButtonGroup: RadioButtonGroup,
  // StrengthMeter: StrengthMeter,
  // IconPicker: IconPicker,
  // InputCountDown: CountdownInput,

  // Upload: BasicUpload,
  Select: Select,
  TreeSelect: TreeSelect,
  Tree: Tree,
  Switch: Switch,
  RadioGroup: Radio.Group,
  Checkbox: Checkbox,
  CheckboxGroup: Checkbox.Group,
  Cascader: Cascader,
  Slider: Slider,
  Rate: Rate,

  DatePicker: DatePicker,
  MonthPicker: DatePicker.MonthPicker,
  RangePicker: DatePicker.RangePicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker: TimePicker,

  Divider: Divider,
};

export type ComponentMapType = keyof typeof componentMap;

export { componentMap };
