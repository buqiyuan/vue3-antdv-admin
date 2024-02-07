import dayjs from 'dayjs';
import type { RuleObject } from 'ant-design-vue/es/form/';
import type { ComponentType } from './types/component';
import { isNumber } from '@/utils/is';
import { useI18n } from '@/hooks/useI18n';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType, label = '') {
  const { t } = useI18n();

  if (component.includes('Input') || component.includes('Complete')) {
    return `${t('common.inputText')}${label}`;
  }
  const chooseTypes: ComponentType[] = [
    'Select',
    'Cascader',
    'Checkbox',
    'CheckboxGroup',
    'Switch',
    'TreeSelect',
  ];
  if (component.includes('Picker') || chooseTypes.includes(component)) {
    return `${t('common.chooseText')}${label}`;
  }
  return '';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function setComponentRuleType(
  rule: RuleObject,
  component: ComponentType,
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

export function handleInputNumberValue(component?: ComponentType, val?: any) {
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
