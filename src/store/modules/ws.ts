import { defineStore } from 'pinia';
import { Modal } from 'ant-design-vue';
import type { SocketIOWrapperType, SocketStatusType } from '@/core/socket/socket-io';
import router from '@/router';
import { store } from '@/store';
import { EVENT_KICK, EVENT_UPDATE_MENU } from '@/core/socket/event-type';
import { SocketIOWrapper, SocketStatus } from '@/core/socket/socket-io';
import { useUserStore } from '@/store/modules/user';
import { useTabsViewStore } from '@/store/modules/tabsView';

interface WsState {
  client: SocketIOWrapperType | null;
  status: SocketStatusType;
}

export const useWsStore = defineStore({
  id: 'ws',
  state: (): WsState => ({
    // socket wrapper 实例
    client: null,
    // socket 连接状态
    status: SocketStatus.CLOSE,
  }),
  actions: {
    setClient(client: SocketIOWrapperType | null) {
      this.client = client as any;
    },
    setStatus(status: SocketStatusType) {
      if (this.status === status) {
        return;
      }
      this.status = status;
    },
    // 初始化Socket
    initSocket() {
      // check is init
      if (this.client?.isConnected?.()) {
        return;
      }
      const ws = new SocketIOWrapper();
      ws.subscribe(EVENT_KICK, async (data) => {
        const userStore = useUserStore();
        // reset token
        userStore.resetToken();
        Modal.warning({
          title: '警告',
          content: `您已被管理员${data.operater}踢下线！`,
          centered: true,
          okText: '重新登录',
          onOk() {
            // 刷新页面
            window.location.reload();
          },
        });
      });
      ws.subscribe(EVENT_UPDATE_MENU, async () => {
        const userStore = useUserStore();
        const tabsViewStore = useTabsViewStore();
        console.log('EVENT_UPDATE_MENU', EVENT_UPDATE_MENU);

        await userStore.afterLogin();
        const currentRoute = router.currentRoute.value!;
        const hasRoute = router.hasRoute(currentRoute.name!);
        if (Object.is(hasRoute, false)) {
          Modal.warning({
            title: '提示',
            content: `您的权限已被管理员修改，暂无当前页面预览权限！`,
            centered: true,
            okText: '关闭当前页',
            onOk() {
              tabsViewStore.closeCurrentTab(currentRoute);
            },
          });
        }
      });
      this.setClient(ws);
    },

    // 关闭Socket连接
    closeSocket() {
      this.client?.close?.();
      this.setClient(null);
    },
  },
});

// 在组件setup函数外使用
export function useWsStoreWithOut() {
  return useWsStore(store);
}
