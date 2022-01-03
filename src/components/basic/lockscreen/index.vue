<template>
  <transition name="slide-up">
    <LockScreen v-if="isLock && isMouted && $route.name != LOGIN_NAME" />
  </transition>
</template>

<script setup lang="ts">
  import LockScreen from './lockscreen.vue';
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { LOGIN_NAME } from '@/router/constant';

  const lockscreenStore = useLockscreenStore();
  const route = useRoute();
  const isLock = computed(() => lockscreenStore.isLock);
  const lockTime = computed(() => lockscreenStore.lockTime);
  const isMouted = ref(false);

  let timer;

  const timekeeping = () => {
    clearInterval(timer);
    if (route.name === LOGIN_NAME || isLock.value) return;
    // 设置不锁屏
    lockscreenStore.setLock(false);
    // 重置锁屏时间
    lockscreenStore.setLockTime();
    timer = setInterval(() => {
      // 锁屏倒计时递减
      lockscreenStore.setLockTime(lockTime.value - 1);
      if (lockTime.value <= 0) {
        // 设置锁屏
        lockscreenStore.setLock(true);
        return clearInterval(timer);
      }
      // console.log(lockTime.value, '锁屏倒计时')
    }, 1000);
  };

  onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
    setTimeout(() => {
      isMouted.value = true;
    });
  });

  onUnmounted(() => document.removeEventListener('mousedown', timekeeping));
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
