import { IS_LOCKSCREEN } from '@/enums/cacheEnum';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { Storage } from '@/utils/Storage';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const isLock = Storage.get(IS_LOCKSCREEN, false);

export type LockscreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const useLockscreenStore = defineStore({
  id: 'lockscreen',
  state: (): LockscreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock == 'true' ? initTime : 0,
  }),
  actions: {
    setLock(isLock) {
      this.isLock = isLock;
      Storage.set(IS_LOCKSCREEN, this.isLock);
    },
    setLockTime(lockTime = initTime) {
      this.lockTime = lockTime;
    },
  },
});
// 在组件setup函数外使用
export function useLockscreenStoreWithOut() {
  return useLockscreenStore(store);
}
