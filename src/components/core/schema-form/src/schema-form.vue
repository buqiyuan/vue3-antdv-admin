<template>
  <Form
    ref="schemaFormRef"
    v-bind="pick(getFormProps, aFormPropKeys)"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <Row v-bind="getRowConfig">
      <slot name="formHeader" />
      <slot>
        <template v-for="schemaItem in formPropsRef.schemas" :key="schemaItem.field">
          <component
            :is="h(SchemaFormItem, {}, $slots)"
            v-model:form-model="formModel"
            :schema="schemaItem"
            :table-instance="tableInstance"
          />
        </template>
        <FormAction
          v-if="showActionButtonGroup"
          v-bind="getFormActionBindProps"
          @toggle-advanced="handleToggleAdvanced"
        >
          <template
            v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
            #[item]="data"
          >
            <slot :name="item" v-bind="data || {}" />
          </template>
        </FormAction>
      </slot>
      <slot name="formFooter" />
    </Row>
  </Form>
</template>

<script lang="ts" setup>
  import { h } from 'vue';
  import { pick } from 'lodash-es';
  import { Form, Row } from 'ant-design-vue';
  import SchemaFormItem from './schema-form-item.vue';
  import FormAction from './components/form-action.vue';
  import { createFormContext, useFormState, useFormMethods, useAdvanced } from './hooks/';
  import { schemaFormProps, schemaFormEmits, aFormPropKeys } from './schema-form';

  defineOptions({
    name: 'SchemaForm',
  });

  const props = defineProps(schemaFormProps);
  const emit = defineEmits(schemaFormEmits);

  // 表单内部状态
  const formState = useFormState(props);
  const {
    formModel,
    getRowConfig,
    schemaFormRef,
    getFormProps,
    getFormActionBindProps,
    formPropsRef,
  } = formState;

  // 表单内部方法
  const formMethods = useFormMethods({ formState, emit });
  const { handleEnterPress, setDefaultValue } = formMethods;

  /** 当前组件所有的状态和方法 */
  const schemaFormContext = {
    props,
    emit,
    ...formState,
    ...formMethods,
  };
  /** 创建表单上下文 */
  createFormContext(schemaFormContext);

  // 搜索表单 展开/收起 表单项hooks
  const { handleToggleAdvanced } = useAdvanced({ formState, emit });

  emit('register', schemaFormContext);

  defineExpose(schemaFormContext);

  // 初始化表单默认值
  setDefaultValue(formPropsRef.value.schemas);
</script>
