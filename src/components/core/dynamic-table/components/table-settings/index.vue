<template>
  <Space :size="8">
    <RefreshSetting />
    <ColumnSetting />
    <SizeSetting />
  </Space>
</template>

<script lang="ts" setup>
  import { Space } from 'ant-design-vue';
  import SizeSetting from './size-setting.vue';
  import RefreshSetting from './refresh-setting.vue';
  import ColumnSetting from './column-setting.vue';
</script>
