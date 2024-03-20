<template>
  <div>
    <Alert message="自定义模态框" type="info" show-icon style="margin-bottom: 12px">
      <template #description>
        对ant-design-vue的modal进行二次封装，自定义一个可拖拽、可调整大小的模态框，
        <span class="text-red-500">
          Tips: 如果你的弹窗依赖于App上下文（provide/inject），你应该使用`useModal组件方式`
        </span>
        <a
          class="text-blue-500"
          target="_blank"
          href="https://github.com/buqiyuan/vue3-antdv-admin/blob/main/src/views/demos/custom-modal.vue"
        >
          查看源码
        </a>
      </template>
    </Alert>
    <a-card>
      <Space>
        <a-button type="primary" @click="state.visible = true">普通组件方式</a-button>
        <a-button type="primary" @click="handleOpenUseModal">useModal组件方式</a-button>
        <a-button type="primary" @click="handleOpenHookModal">hook纯函数式</a-button>
      </Space>
    </a-card>
    <DraggableModal v-model:open="state.visible" @ok="onOk" />
    <UseModalComp />
  </div>
</template>

<script setup lang="tsx">
  import { reactive } from 'vue';
  import { Alert, Space } from 'ant-design-vue';
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { useModal } from '@/hooks/useModal';

  defineOptions({
    name: 'CustomModal',
  });

  /**
   * @description 扩展ant-design-vue模态框功能
   */

  const [fnModal] = useModal();
  const [UseModalComp] = useModal();

  const state = reactive({
    visible: false,
  });

  const handleOpenHookModal = () => {
    fnModal.show({
      title: '我是hook纯函数式模态框',
      content: 'hello',
    });
  };
  const handleOpenUseModal = () => {
    UseModalComp.show({
      title: '我是UseModalComp',
      content: '嘿嘿嘿',
    });
  };

  const onOk = () => {
    state.visible = false;
  };
</script>

<style scoped></style>
