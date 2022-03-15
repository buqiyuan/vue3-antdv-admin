import { unref } from 'vue';
import { set } from 'lodash-es';
import type { FormSchema } from '../types/form';
import type { FormState } from './useFormState';
import type { SchemaFormProps } from '../schema-form';
import { deepMerge } from '@/utils/';
import { isFunction, isNullOrUnDef, isObject, isArray, isString } from '@/utils/is';
import { dateUtil } from '@/utils/dateUtil';

type UseFormMethodsContext = FormState;

export type FormMethods = ReturnType<typeof useFormMethods>;

export const useFormMethods = (formMethodsContext: UseFormMethodsContext) => {
  const {
    compRefs,
    formModel,
    formPropsRef,
    cacheFormModel,
    defaultFormValues,
    schemaFormRef,
    getFormProps,
  } = formMethodsContext;

  // 将所有的表单组件实例保存起来
  const setItemRef = (formItem: FormSchema) => {
    return (el) => {
      if (el) {
        compRefs[formItem.field] = el;
      }
    };
  };

  // 设置某个字段的值
  const setFormModel = (key: string, value: any) => {
    formModel[key] = value;
    cacheFormModel[key] = value;
    const { validateTrigger } = unref(getFormProps);
    if (!validateTrigger || validateTrigger === 'change') {
      schemaFormRef.value?.validateFields([key]);
    }
  };

  const setSchemaFormProps = (formProps: Partial<SchemaFormProps>) => {
    formPropsRef.value = deepMerge(unref(formPropsRef) || {}, formProps);
  };

  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = unref(getFormProps).transformDateFunc;
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((item) => transformDateFunc?.(item));
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }
      set(res, key, value);
    }
    return handleRangeTimeValue(res);
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = unref(getFormProps).fieldMapToTime;

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue;
      }

      const [startTime, endTime]: string[] = values[field];

      values[startTimeKey] = dateUtil(startTime).format(format);
      values[endTimeKey] = dateUtil(endTime).format(format);
      Reflect.deleteProperty(values, field);
    }

    return values;
  }

  // 初始化数据
  const initFormValues = () => {
    unref(formPropsRef).schemas?.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        formModel[item.field] = defaultValue;
        defaultFormValues[item.field] = defaultValue;
        cacheFormModel[item.field] = defaultValue;
      }
    });
  };

  return {
    setItemRef,
    initFormValues,
    setFormModel,
    setSchemaFormProps,
    handleFormValues,
  };
};
