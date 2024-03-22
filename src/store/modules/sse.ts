import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useIdle } from '@vueuse/core';
import mitt from 'mitt';
import { useUserStore } from './user';
import { uniqueSlash } from '@/utils/urlUtils';

export type MessageEvent = {
  data?: any;
  type?: 'ping' | 'close' | 'updatePermsAndMenus' | 'updateOnlineUserCount';
};

type Events = {
  onlineUser: number;
};

export const useSSEStore = defineStore('sse', () => {
  const emitter = mitt<Events>();
  const userStore = useUserStore();
  const { idle } = useIdle(5 * 60 * 1000); // 5 min
  let eventSource: EventSource | null = null;
  const serverConnected = ref(true);
  const onlineUserCount = ref(0);

  watch(serverConnected, (val) => {
    if (val && userStore.token) {
      initServerMsgListener();
    } else {
      closeEventSource();
    }
  });

  watch(idle, (idleValue) => {
    if (idleValue) {
      closeEventSource();
    } else if (userStore.token) {
      setServerConnectStatus(true);
    }
  });

  const closeEventSource = () => {
    serverConnected.value = false;
    eventSource?.close();
    eventSource = null;
  };

  /** 监听来自服务端推送的消息 */
  const initServerMsgListener = async () => {
    if (eventSource) {
      eventSource.close();
    }
    const uid = userStore.userInfo.id;
    if (!uid) return;
    const sseUrl = uniqueSlash(
      `${import.meta.env.VITE_BASE_API_URL}/api/sse/${uid}?token=${userStore.token}`,
    );

    eventSource = new EventSource(sseUrl);

    // 处理 SSE 传递的数据
    eventSource.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data) as MessageEvent;
      // 服务器关闭 SSE 连接
      if (type === 'close') {
        closeEventSource();
      }
      // 当用户的权限及菜单有变更时，重新获取权限及菜单
      else if (type === 'updatePermsAndMenus') {
        userStore.fetchPermsAndMenus();
      }
      // 在线用户数量变更时
      else if (type === 'updateOnlineUserCount') {
        onlineUserCount.value = ~~data;
        emitter.emit('onlineUser', onlineUserCount.value);
      }
      // console.log('eventSource', event.data);
    };
    eventSource.onerror = (err) => {
      console.log('eventSource err', err);
      closeEventSource();
    };
  };

  const setServerConnectStatus = (isConnect: boolean) => {
    serverConnected.value = isConnect;
  };

  return {
    emitter,
    onlineUserCount,
    closeEventSource,
    initServerMsgListener,
    setServerConnectStatus,
  };
});
