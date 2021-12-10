<template>
  <config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
    <LockScreen />
  </config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { ConfigProvider } from 'ant-design-vue';
  // import SuspenseWithError from '@/components/SuspenseWithError.vue'
  import { LockScreen } from '@/components/lockscreen';
</script>

<style lang="less">
  @import '~@/styles/global.less';
  @import '~@/styles/common.less';
  @import '~@/styles/antdv.override.less';
</style>
