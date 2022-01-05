<template>
  <div>
    <Alert
      message="可扩展antd按钮样式功能"
      description="继承自原ant-design-vue的a-button，轻易扩展按钮的type定制不同颜色，详细看@/components/button/button.vue"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <Card>
      <Space>
        <AButton type="primary">primary</AButton>
        <AButton type="danger">danger</AButton>
        <AButton type="warning">warning</AButton>
        <AButton type="success">success</AButton>
      </Space>
    </Card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'DemoButton',
  };
</script>

<script setup lang="ts">
  import { Alert, Space, Card } from 'ant-design-vue';
  import { AButton } from '@/components/basic/button';
</script>
