<template>
  <div class="flex items-center">
    <span class="mr-14px">
      <EnterOutlined class="icon text-15px p-2px mr-3px" />
      确认
    </span>
    <span class="mr-14px">
      <ArrowUpOutlined class="icon text-15px p-2px mr-5px" />
      <ArrowDownOutlined class="icon text-15px p-2px mr-3px" />
      切换
    </span>
    <span>
      <CloseOutlined class="icon text-15px p-2px mr-3px" />
      关闭
    </span>
  </div>
</template>

<script lang="ts" setup>
  import {
    EnterOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    CloseOutlined,
  } from '@ant-design/icons-vue';
</script>
<style lang="less" scoped>
  .icon {
    box-shadow:
      inset 0 -2px #cdcde6,
      inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
  }
</style>
