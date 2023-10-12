<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { useLocale } from '@/locales/useLocale';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  defineOptions({
    name: 'ProConfigProvider',
  });

  const layoutSetting = useLayoutSettingStore();
  const { getAntdLocale } = useLocale();
</script>

<template>
  <ConfigProvider :locale="getAntdLocale" :theme="layoutSetting.themeConfig">
    <slot></slot>
  </ConfigProvider>
</template>

<style lang="less" scoped></style>
