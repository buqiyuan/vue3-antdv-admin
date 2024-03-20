<template>
  <transition name="slide-up">
    <LockScreenPage v-if="isLock && isMouted && $route.name != LOGIN_NAME" />
  </transition>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import LockScreenPage from './lockscreen-page.vue';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { LOGIN_NAME } from '@/router/constant';

  const lockscreenStore = useLockscreenStore();
  const isLock = computed(() => lockscreenStore.isLock);
  const isMouted = ref(false);

  onMounted(() => {
    setTimeout(() => {
      isMouted.value = true;
    });
  });
</script>

<style lang="less" scoped>
  .slide-up-enter-active {
    animation: slide-up 0.5s;
  }

  .slide-up-leave-active {
    animation: slide-up 0.5s reverse;
  }

  @keyframes slide-up {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
