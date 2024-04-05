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
        <template v-for="schemaItem in formSchemasRef" :key="schemaItem.field">
          <SchemaFormItem
            v-model:form-model="formModel"
            :schema="schemaItem"
            :table-instance="tableInstance"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
              <slot :name="item" v-bind="data || {}" />
            </template>
          </SchemaFormItem>
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
  import { useAttrs } from 'vue';
  import { pick } from 'lodash-es';
  import { Form, Row } from 'ant-design-vue';
  import SchemaFormItem from './schema-form-item.vue';
  import FormAction from './components/form-action.vue';
  import {
    createFormContext,
    useFormState,
    useFormEvents,
    useFormMethods,
    useAdvanced,
    type SchemaFormType,
  } from './hooks/';
  import { schemaFormProps, schemaFormEmits, aFormPropKeys } from './schema-form';

  defineOptions({
    name: 'SchemaForm',
  });

  const props = defineProps(schemaFormProps);
  const emit = defineEmits(schemaFormEmits);
  const attrs = useAttrs();

  // 表单内部状态
  const formState = useFormState({ props, attrs });
  const {
    formModel,
    getRowConfig,
    schemaFormRef,
    getFormProps,
    getFormActionBindProps,
    formSchemasRef,
  } = formState;

  // 表单内部方法
  const formMethods = useFormMethods({ ...formState });
  const { handleFormValues } = formMethods;

  // a-form表单事件二次封装和扩展
  const formEvents = useFormEvents({ ...formState, emit, handleFormValues });
  const { handleEnterPress, setDefaultValue } = formEvents;

  // 当前组件所有的状态和方法
  const instance = {
    ...formState,
    ...formEvents,
    ...formMethods,
  } as SchemaFormType;

  // 搜索表单 展开/收起 表单项hooks
  const { handleToggleAdvanced } = useAdvanced({
    instance,
    emit,
  });

  emit('register', instance);

  createFormContext(instance);

  defineExpose(instance);

  // 初始化表单默认值
  setDefaultValue(formSchemasRef.value);
</script>
