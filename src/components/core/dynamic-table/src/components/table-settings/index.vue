<template>
  <Space :size="8" class="dark:text-white">
    <SearchSetting />
    <RefreshSetting />
    <Fullscreen />
    <ColumnSetting />
    <SizeSetting />
  </Space>
</template>

<script lang="ts" setup>
  import { Space } from 'ant-design-vue';
  import SizeSetting from './size-setting.vue';
  import RefreshSetting from './refresh-setting.vue';
  import ColumnSetting from './column-setting.vue';
  import SearchSetting from './search-setting.vue';
  import Fullscreen from './fullscreen.vue';
</script>
