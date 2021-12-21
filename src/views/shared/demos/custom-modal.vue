<template>
  <div>
    <Alert
      message="自定义模态框"
      description="对ant-design-vue的modal进行二次封装，自定义一个可拖拽、可调整大小的模态框"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      <a-button type="primary" @click="state.visible = true">弹出弹窗</a-button>
    </a-card>
    <CustomAModal v-model:visible="state.visible" @ok="onOk" />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { CustomAModal } from '@/components/a-custom-modal';
  /**
   * @description 扩展ant-design-vue模态框功能
   */
  const state = reactive({
    visible: false,
  });

  const onOk = () => {
    state.visible = false;
  };
</script>

<style scoped></style>
