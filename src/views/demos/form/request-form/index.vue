<template>
  <div>
    <Alert message="requestForm示例" type="info" show-icon style="margin-bottom: 12px">
      <template #description>
        <p>切换不同选项时自动请求不同接口数据进行填充</p>
        <a
          class="text-blue-500"
          target="_blank"
          href="https://github.com/buqiyuan/vue3-antdv-admin/blob/main/src/views/demos/form/request-form/index.vue"
        >
          查看源码
        </a>
      </template>
    </Alert>
    <a-card>
      <SchemaForm @submit="confirm" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { Alert, message } from 'ant-design-vue';
  import { schemas } from './form-schema';
  import { useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DemosFormRequestForm',
  });

  const [SchemaForm, dynamicFormRef] = useForm({
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
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
