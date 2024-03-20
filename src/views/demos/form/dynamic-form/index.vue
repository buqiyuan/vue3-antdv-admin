<template>
  <div>
    <Alert message="动态表单示例" type="info" show-icon style="margin-bottom: 12px" />
    <div class="mb-4">
      <a-button class="mr-2" @click="changeLabel3"> 更改字段3label </a-button>
      <a-button class="mr-2" @click="changeLabel34"> 同时更改字段3,4label </a-button>
      <a-button class="mr-2" @click="appendField"> 往字段3后面插入字段10 </a-button>
      <a-button class="mr-2" @click="deleteField"> 删除字段11 </a-button>
    </div>
    <a-card>
      <schema-form ref="dynamicForm" v-bind="formProps" @submit="confirm" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Alert, message } from 'ant-design-vue';
  import { schemas } from './form-schema';
  import type { SchemaFormProps } from '@/components/core/schema-form';
  import { SchemaForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DemosFormDynamicForm',
  });

  /**
   * @description 基础表单
   */
  const dynamicForm = ref<InstanceType<typeof SchemaForm>>();

  const formProps: SchemaFormProps = { schemas, labelWidth: 120, actionColOptions: { span: 24 } };

  // 点击提交
  function confirm() {
    console.log('dynamicForm.value', dynamicForm.value?.formModel);

    dynamicForm.value?.validate().then(() => message.success('验证通过！'));
  }

  function changeLabel3() {
    dynamicForm.value?.updateSchema({
      field: 'field3',
      label: '字段3 New',
    });
  }
  function changeLabel34() {
    dynamicForm.value?.updateSchema([
      {
        field: 'field3',
        label: '字段3 New++',
      },
      {
        field: 'field4',
        label: '字段4 New++',
      },
    ]);
  }

  function appendField() {
    dynamicForm.value?.appendSchemaByField(
      {
        field: 'field10',
        label: '字段10',
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
      'field3',
    );
  }
  function deleteField() {
    dynamicForm.value?.removeSchemaByField('field11');
  }
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
