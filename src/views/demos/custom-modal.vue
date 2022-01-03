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
      <Space>
        <a-button type="primary" @click="state.visible = true">弹出弹窗</a-button>
        <a-button type="primary" @click="handleOpenModal">函数式调用弹窗</a-button>
      </Space>
    </a-card>
    <DraggableModal v-model:visible="state.visible" @ok="onOk" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomModal',
  };
</script>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Alert, Space } from 'ant-design-vue';
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { useModal } from '@/hooks/useModal/';
  /**
   * @description 扩展ant-design-vue模态框功能
   */

  const fnModal = useModal();

  const state = reactive({
    visible: false,
  });

  const handleOpenModal = () => {
    fnModal.show({
      title: '我是标题',
      content: 'hello',
    });
  };

  const onOk = () => {
    state.visible = false;
  };
</script>

<style scoped></style>
