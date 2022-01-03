<template>
  <ConfigProvider :locale="getAntdLocale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { LockScreen } from '@/components/basic/lockscreen';
  import { useRoute } from 'vue-router';
  import { useLocale } from '@/locales/useLocale';
  import { transformI18n } from './hooks/useI18n';

  const route = useRoute();
  const { getAntdLocale } = useLocale();

  watchEffect(() => {
    if (route.meta?.title) {
      // 翻译网页标题
      document.title = transformI18n(route.meta.title);
    }
  });
</script>

<style lang="less"></style>
