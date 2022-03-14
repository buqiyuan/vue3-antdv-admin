<template>
  <div>
    <Alert
      message="验证表单"
      description="动态验证表单"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      <schema-form ref="dynamicForm" v-bind="formProps">
        <template #operate-button>
          <a-button type="primary" @click="confirm"> 确定 </a-button>
        </template>
      </schema-form>
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
    name: 'DemosFormBasicForm',
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
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
