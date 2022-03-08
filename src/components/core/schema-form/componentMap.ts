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

const componentMap = {
  Input: Input,
  InputGroup: Input.Group,
  InputPassword: Input.Password,
  InputSearch: Input.Search,
  InputTextArea: Input.TextArea,
  InputNumber: InputNumber,
  AutoComplete: AutoComplete,
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
