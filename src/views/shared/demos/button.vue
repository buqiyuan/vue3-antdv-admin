<template>
  <div>
    <Alert
      message="可扩展antd按钮样式功能"
      description="继承自原ant-design-vue的a-button，轻易扩展按钮的type定制不同颜色，详细看@/components/button/button.vue"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      <div class="btn-rows">
        <a-button type="primary">primary</a-button>
        <a-button type="danger">danger</a-button>
        <a-button type="warning">warning</a-button>
        <a-button type="success">success</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { Alert } from 'ant-design-vue';

  /**
   * @description 扩展ant-design-vue模态框功能
   */
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
