import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { ComponentMapType } from './types/index';
import { isNumber } from '@/utils/is';
import dayjs from 'dayjs';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentMapType, label = '') {
  if (component.includes('Input') || component.includes('Complete')) {
    return `请输入${label}`;
  }
  const chooseTypes: ComponentMapType[] = [
    'Select',
    'Cascader',
    'Checkbox',
    'CheckboxGroup',
    'Switch',
    'TreeSelect',
  ];
  if (component.includes('Picker')) {
    return `请选择${label}`;
  }
  if (chooseTypes.includes(component)) {
    return `请选择${label}`;
  }
  return '';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function setComponentRuleType(
  rule: ValidationRule,
  component: ComponentMapType,
  valueFormat: string,
) {
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object';
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr;
  if (valueFormat) {
    // attr.value = isObject(value) ? dayjs(value).format(valueFormat) : value
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dayjs(attr.value);
  }
}

export function handleInputNumberValue(component?: ComponentMapType, val?: any) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();
