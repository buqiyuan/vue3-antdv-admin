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
      <SchemaForm @register="register">
        <template #operate-button>
          <a-button type="primary" @click="confirm"> 确定 </a-button>
        </template>
      </SchemaForm>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, message } from 'ant-design-vue';
  import { schemas } from './form-schema';
  import { SchemaForm, useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DemosFormDynamicForm',
  });

  const [register, dynamicFormRef] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
    },
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
  });

  // 点击提交
  function confirm() {
    console.log('dynamicFormRef', dynamicFormRef);

    dynamicFormRef.validate().then(() => message.success('验证通过！'));
  }

  function changeLabel3() {
    dynamicFormRef?.updateSchema({
      field: 'field3',
      label: '字段3 New',
    });
  }
  function changeLabel34() {
    dynamicFormRef?.updateSchema([
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
    dynamicFormRef?.appendSchemaByField(
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
    dynamicFormRef?.removeSchemaByFiled('field11');
  }
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
