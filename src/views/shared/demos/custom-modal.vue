<template>
  <div>
    <Alert
      message="自定义模态框"
      description="沿用ant-design-vue的modal样式，自定义一个可拖拽、可调整大小的模态框"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      <a-button type="primary" @click="state.visible = true">弹出弹窗</a-button>
    </a-card>
    <a-custom-modal v-model:visible="state.visible" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { ACustomModal } from '@/components/a-custom-modal';

  /**
   * @description 扩展ant-design-vue模态框功能
   */
  const state = reactive({
    visible: false,
  });
</script>

<style scoped></style>
