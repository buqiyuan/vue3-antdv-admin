<template>
  <div>
    <SuspenseWithError>
      <router-view v-slot="{ Component }">
        <transition name="zoom-fade" mode="out-in" appear>
          <keep-alive :include="keepAliveComponents">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </SuspenseWithError>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import SuspenseWithError from '@/components/SuspenseWithError.vue';

  const tabsViewStore = useTabsViewStore();
  // 需要缓存的路由组件
  const keepAliveComponents = computed(() => tabsViewStore.keepAliveComponents);
</script>
