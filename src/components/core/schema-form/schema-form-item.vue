<template>
  <Col v-bind="schemaItem.colProps">
    <Form.Item
      v-bind="{ ...schemaItem.formItemProps }"
      :label="renderLabelHelpMessage"
      :name="schemaItem.field"
      :labelCol="itemLabelWidthProp.labelCol"
      :wrapperCol="itemLabelWidthProp.wrapperCol"
      :rules="getRules"
    >
      <slot v-if="schemaItem.slot" :name="schemaItem.slot" v-bind="getValues"> </slot>
      <component
        v-else
        :is="getComponent"
        :ref="setItemRef"
        :key="schemaItem.field"
        :allowClear="true"
        v-bind="getComponentProps"
        v-on="componentEvents"
        v-model:[modelValueType]="modelValue[schemaItem.field]"
      >
        <template v-if="Object.is(schemaItem.loading, true)" #notFoundContent>
          <Spin size="small" />
        </template>
      </component>
    </Form.Item>
  </Col>
</template>

<script setup lang="tsx">
  import { PropType, Ref } from 'vue';
  import { computed, unref, toRefs, onMounted } from 'vue';
  import { Form, Col, Spin } from 'ant-design-vue';
  import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
  import { componentMap, ComponentMapType } from './componentMap';
  import { FormItemSchema, FormSchema } from './types/form';
  import { isFunction, isNull, isString } from '@/utils/is';
  import { useVModel } from '@vueuse/core';
  import { useItemLabelWidth } from './hooks/useLabelWidth';
  import cloneDeep from 'lodash/cloneDeep';
  import { createPlaceholderMessage } from './helper';
  import BasicHelp from '@/components/basic/basic-help/index.vue';
  import { AllComponentProps } from './types';
  import { useFormContext } from './hooks/useFormContext';

  const props = defineProps({
    formModel: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    schemaItem: {
      type: Object as PropType<FormItemSchema>,
      default: () => ({}),
    },
    schema: {
      type: Object as PropType<FormSchema>,
      default: () => ({}),
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null,
    },
    /** 将表单组件实例保存起来 */
    setItemRef: {
      type: Function,
      default: () => {},
    },
  });

  const emit = defineEmits(['update:formModel']);

  // const currentInstance = getCurrentInstance();
  // schemaForm组件实例
  const schemaFormRef = useFormContext();

  const modelValue = useVModel(props, 'formModel', emit);

  const { schemaItem, schema } = toRefs(props) as {
    schemaItem: Ref<FormItemSchema>;
    schema: Ref<FormSchema>;
  };

  const itemLabelWidthProp = useItemLabelWidth(schemaItem, schema);
  // eslint-disable-next-line
  const valuesRef = computed(() => {
    const { formModel, schemaItem } = props;
    return { formModel, schemaItem, field: schemaItem.field };
  });

  const modelValueType = computed(() => {
    const { component, componentProps } = schemaItem.value;
    if (typeof componentProps !== 'function' && componentProps?.vModelKey) {
      return componentProps.vModelKey;
    }
    const isCheck = isString(component) && ['Switch', 'Checkbox'].includes(component);
    return isCheck ? 'checked' : 'value';
  });

  const getValues = computed(() => {
    const { formModel, schemaItem } = props;
    const { mergeDynamicData } = props.schema;
    return {
      field: schemaItem.field,
      formModel: formModel,
      values: {
        ...mergeDynamicData,
        ...formModel,
      } as Recordable,
      schemaItem: schemaItem,
    };
  });

  /**
   * @description 当前表单项组件
   */
  const getComponent = computed(() => {
    const component = props.schemaItem.component;
    return isString(component) ? componentMap[component] : component;
  });

  /**
   * @description 表单组件props
   */
  const getComponentProps = computed(() => {
    const { formModel, schemaItem } = props;
    const { componentProps = {}, component, label = '' } = schemaItem;

    if (isFunction(componentProps)) {
      const compProps = componentProps({
        formModel,
        schemaFormRef,
        schemaItem,
      }) as AllComponentProps;

      compProps.placeholder ??= isString(component)
        ? createPlaceholderMessage(component, label)
        : undefined;
      return compProps;
    }
    if (component !== 'RangePicker' && isString(component)) {
      (componentProps as AllComponentProps).placeholder ??= createPlaceholderMessage(
        component,
        label,
      );
    }

    return componentProps as AllComponentProps;
  });

  /**
   * @description 表单组件事件
   */
  const componentEvents = computed(() => {
    const componentProps = props.schemaItem?.componentProps || {};
    return Object.keys(componentProps).reduce((prev, key) => {
      if (/on([A-Z])/.test(key)) {
        // eg: onChange => change
        const eventKey = key.replace(/on([A-Z])/, '$1').toLocaleLowerCase();
        prev[eventKey] = componentProps[key];
      }
      return prev;
    }, {});
  });

  const renderLabelHelpMessage = computed(() => {
    const { label, helpMessage, helpComponentProps, subLabel } = props.schemaItem;
    const renderLabel = subLabel ? (
      <span>
        {label} <span class="text-secondary">{subLabel}</span>
      </span>
    ) : (
      label
    );
    const getHelpMessage = isFunction(helpMessage) ? helpMessage(unref(getValues)) : helpMessage;
    if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
      return renderLabel;
    }
    return (
      <span>
        {renderLabel}
        <BasicHelp placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
      </span>
    );
  });

  const getComponentsProps = computed(() => {
    const { schemaItem, formModel } = props;
    let { componentProps = {} } = schemaItem;
    if (isFunction(componentProps)) {
      componentProps = componentProps({ schemaItem, schemaFormRef, formModel }) ?? {};
    }
    return componentProps as Recordable;
  });

  function setComponentRuleType(
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

  const getRules = computed(() => {
    const {
      rules: defRules = [],
      component,
      rulesMessageJoinLabel,
      label,
      dynamicRules,
      required,
      field,
    } = props.schemaItem;

    if (field == 'field5') {
      console.log('rules', props.schemaItem);
    }

    if (isFunction(dynamicRules)) {
      return dynamicRules(unref(getValues)) as ValidationRule[];
    }

    let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[];
    const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.schema;

    const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
      ? rulesMessageJoinLabel
      : globalRulesMessageJoinLabel;
    const defaultMsg = isString(component)
      ? `${createPlaceholderMessage(component, label)}${joinLabel ? label : ''}`
      : undefined;

    function validator(rule: any, value: any) {
      const msg = rule.message || defaultMsg;

      if (value === undefined || isNull(value)) {
        // 空值
        return Promise.reject(msg);
      } else if (Array.isArray(value) && value.length === 0) {
        // 数组类型
        return Promise.reject(msg);
      } else if (typeof value === 'string' && value.trim() === '') {
        // 空字符串
        return Promise.reject(msg);
      } else if (
        typeof value === 'object' &&
        Reflect.has(value, 'checked') &&
        Reflect.has(value, 'halfChecked') &&
        Array.isArray(value.checked) &&
        Array.isArray(value.halfChecked) &&
        value.checked.length === 0 &&
        value.halfChecked.length === 0
      ) {
        // 非关联选择的tree组件
        return Promise.reject(msg);
      }
      return Promise.resolve();
    }

    const getRequired = isFunction(required) ? required(unref(getValues)) : required;

    if ((!rules || rules.length === 0) && getRequired) {
      rules = [{ required: getRequired, validator }];
    }

    const requiredRuleIndex: number = rules.findIndex(
      (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
    );

    if (requiredRuleIndex !== -1) {
      const rule = rules[requiredRuleIndex];

      if (component && isString(component)) {
        if (!Reflect.has(rule, 'type')) {
          rule.type = component === 'InputNumber' ? 'number' : 'string';
        }

        rule.message = rule.message || defaultMsg;

        if (component.includes('Input') || component.includes('Textarea')) {
          rule.whitespace = true;
        }
        const valueFormat = unref(getComponentsProps)?.valueFormat;
        setComponentRuleType(rule, component, valueFormat);
      }
    }

    // Maximum input length rule check
    const characterInx = rules.findIndex((val) => val.max);
    if (characterInx !== -1 && !rules[characterInx].validator) {
      rules[characterInx].message = rules[characterInx].message;
    }

    return rules;
  });

  onMounted(async () => {
    if (getComponentProps.value?.request) {
      const compProps = getComponentProps.value;
      const compName = schemaItem.value.component;
      schemaItem.value.loading = true;
      try {
        if (['Select', 'RadioGroup', 'CheckBoxGroup'].some((n) => n === compName)) {
          compProps.options = await getComponentProps.value?.request();
          console.log('compProps.options', compProps.options);
        } else if (['TreeSelect', 'Tree'].some((n) => n === compName)) {
          compProps.treeData = await getComponentProps.value?.request();
        }
      } finally {
        schemaItem.value.loading = false;
      }
    }
  });
</script>
