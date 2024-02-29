<script setup lang="ts">
  import { ref } from 'vue';
  import { sendSchemas } from './formSchemas';
  import Api from '@/api/';
  import { useForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'ToolsEmail',
  });

  const loading = ref(false);

  const [SchemaForm] = useForm({
    labelWidth: 120,
    schemas: sendSchemas,
    submitButtonOptions: {
      text: '发送邮箱',
    },
    actionColOptions: {
      span: 18,
    },
  });

  const tabList = [
    // {
    //   key: '1',
    //   name: '邮箱配置',
    //   component: defineAsyncComponent(() => import('./BaseConfig.vue')),
    // },
    {
      key: '2',
      name: '发送邮件',
    },
  ];

  async function handleSubmit(values) {
    try {
      loading.value = true;

      await Api.systemEmail.emailSend(values, { successMsg: '发送成功' });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <a-spin :spinning="loading" tip="邮件发送中...">
    <a-card size="small">
      <a-tabs
        tab-position="top"
        :tab-bar-style="{
          marginLeft: '1rem',
        }"
        active-key="2"
      >
        <template v-for="item in tabList" :key="item.key">
          <a-tab-pane :tab="item.name">
            <SchemaForm @submit="handleSubmit" />
          </a-tab-pane>
        </template>
      </a-tabs>
    </a-card>
  </a-spin>
</template>

<style scoped></style>
