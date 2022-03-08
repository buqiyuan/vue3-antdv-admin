import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useWsStore } from '@/store/modules/ws';

export const useSocket = (socketHooks = {}) => {
  const socketClient = useWsStore().client;

  // cache wrapper func
  const socketMap = new Map();

  const registerSocketEvent = () => {
    Object.keys(socketHooks).forEach((e) => {
      if (socketClient) {
        // bind this
        const wrapFunc = socketHooks[e];
        socketMap.set(e, wrapFunc);
        socketClient.subscribe(e, wrapFunc);
      }
    });
  };
  const unregisterSocketEvent = () => {
    Object.keys(socketHooks).forEach((e) => {
      // 增加判断避免被移除掉所有事件
      if (socketClient && socketMap.has(e)) {
        socketClient.unsubscribe(e, socketMap.get(e));
      }
    });
  };
  watch(() => socketClient, registerSocketEvent);
  onMounted(registerSocketEvent);
  onBeforeUnmount(unregisterSocketEvent);
};
