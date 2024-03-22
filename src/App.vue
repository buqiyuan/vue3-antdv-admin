<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </ProConfigProvider>
</template>

<script setup lang="ts">
  import { LockScreen } from '@/components/basic/lockscreen';
</script>
