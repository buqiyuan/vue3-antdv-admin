<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </ProConfigProvider>
</template>

<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { transformI18n } from './hooks/useI18n';
  import { LockScreen } from '@/components/basic/lockscreen';

  const route = useRoute();
  watchEffect(() => {
    if (route.meta?.title) {
      // 翻译网页标题
      document.title = transformI18n(route.meta.title);
    }
  });
</script>
