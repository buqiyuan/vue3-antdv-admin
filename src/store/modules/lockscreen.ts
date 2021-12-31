import { ref, onMounted } from 'vue';
import { IS_LOCKSCREEN } from '@/enums/cacheEnum';
import { defineStore } from 'pinia';
import { Storage } from '@/utils/Storage';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const lockStorage = Storage.get(IS_LOCKSCREEN, false);

export const useLockscreenStore = defineStore('lockscreen', () => {
  const isLock = ref<boolean>(false);
  const lockTime = ref<number>(0);

  function setLock(lock: boolean) {
    isLock.value = lock;
    Storage.set(IS_LOCKSCREEN, isLock.value);
  }

  function setLockTime(time = initTime) {
    lockTime.value = time;
  }

  onMounted(() => {
    isLock.value = lockStorage;
    lockTime.value = lockStorage == 'true' ? initTime : 0;
  });

  return {
    isLock,
    lockTime,
    setLock,
    setLockTime,
  };
});
