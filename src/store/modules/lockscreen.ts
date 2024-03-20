import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import MD5 from 'crypto-js/md5';
import { useIdle } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { store } from '@/store';
import { LOGIN_NAME } from '@/router/constant';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60 * 1000; // 60 分钟

export type LockscreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const useLockscreenStore = defineStore(
  'lockscreen',
  () => {
    const route = useRoute();
    const { idle } = useIdle(initTime); // 5 min
    const loginPwd = ref('');
    const lockPwd = ref('');
    const isLock = ref(false);

    /** 将登录密码通过 MD5 加密保存到本地，用于解锁屏幕 */
    const saveLoginPwd = (pwd: string) => {
      loginPwd.value = MD5(pwd).toString();
    };

    const setLock = (lock: boolean) => {
      isLock.value = lock;
      if (!lock) {
        resetLockPwd();
      }
    };

    /** 不传则默认使用登录密码作为锁屏密码 */
    const setLockPwd = (pwd?: string) => {
      lockPwd.value = pwd ? MD5(pwd).toString() : loginPwd.value;
    };

    /** 重置锁屏密码 */
    const resetLockPwd = () => {
      lockPwd.value = '';
    };

    /** 验证锁屏密码 */
    const verifyLockPwd = (pwd: string) => {
      const inputPwd = MD5(pwd).toString();
      return [lockPwd, loginPwd].some((n) => n.value === inputPwd);
    };

    window.addEventListener('beforeunload', () => {
      if (isLock.value && !lockPwd.value) {
        setLock(false);
      }
    });

    watch(idle, (idleValue) => {
      if (route.name === LOGIN_NAME) {
        setLock(false);
        return;
      }

      if (idleValue) {
        setLock(true);
        setLockPwd();
      }
    });

    return {
      isLock,
      lockPwd,
      loginPwd,
      setLock,
      setLockPwd,
      verifyLockPwd,
      saveLoginPwd,
      resetLockPwd,
    };
  },
  {
    persist: true,
  },
);

// 在组件setup函数外使用
export function useLockscreenStoreWithOut() {
  return useLockscreenStore(store);
}
