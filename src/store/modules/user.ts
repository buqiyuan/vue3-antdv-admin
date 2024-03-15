import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useLockscreenStore } from './lockscreen';
import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import Api from '@/api/';
import { resetRouter } from '@/router';
import { generateDynamicRoutes } from '@/router/helper/routeHelper';
import { uniqueSlash } from '@/utils/urlUtils';

export type MessageEvent = {
  data?: any;
  type?: 'ping' | 'close' | 'updatePermsAndMenus';
};

export const useUserStore = defineStore(
  'user',
  () => {
    const lockscreenStore = useLockscreenStore();
    let eventSource: EventSource | null = null;
    const token = ref<string>();
    const perms = ref<string[]>([]);
    const menus = ref<RouteRecordRaw[]>([]);
    const userInfo = ref<Partial<API.UserEntity>>({});
    const serverConnected = ref(true);

    watch(serverConnected, (val) => {
      if (val && token.value) {
        initServerMsgListener();
      } else {
        eventSource?.close();
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
      const uid = userInfo.value.id;
      const sseUrl = uniqueSlash(
        `${import.meta.env.VITE_BASE_API_URL}/api/sse/${uid}?token=${token.value}`,
      );

      eventSource = new EventSource(sseUrl);
      // 处理 SSE 传递的数据
      eventSource.onmessage = (event) => {
        const { type } = JSON.parse(event.data) as MessageEvent;
        // 服务器关闭 SSE 连接
        if (type === 'close') {
          closeEventSource();
        }
        // 当用户的权限及菜单有变更时，重新获取权限及菜单
        else if (type === 'updatePermsAndMenus') {
          fetchPermsAndMenus();
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

    const sortMenus = (menus: RouteRecordRaw[] = []) => {
      return menus
        .filter((n) => {
          const flag = !n.meta?.hideInMenu;
          if (flag && n.children?.length) {
            n.children = sortMenus(n.children);
          }
          return flag;
        })
        .sort((a, b) => ~~a.meta?.orderNo! - ~~b.meta?.orderNo!);
    };

    /** 清空登录态(token、userInfo...) */
    const clearLoginStatus = () => {
      token.value = '';
      perms.value = [];
      menus.value = [];
      userInfo.value = {};
      resetRouter();
      setTimeout(() => {
        localStorage.clear();
      });
    };
    /** 登录成功保存token */
    const setToken = (_token: string) => {
      token.value = _token;
    };
    /** 登录 */
    const login = async (params: API.LoginDto) => {
      try {
        const data = await Api.auth.authLogin(params);
        setToken(data.token);
        await afterLogin();
        lockscreenStore.saveLoginPwd(params.password);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    const afterLogin = async () => {
      try {
        const { accountProfile } = Api.account;
        // const wsStore = useWsStore();
        const userInfoData = await accountProfile();

        userInfo.value = userInfoData;
        await fetchPermsAndMenus();
        initServerMsgListener();
      } catch (error) {
        return Promise.reject(error);
        // return logout();
      }
    };
    /** 获取权限及菜单 */
    const fetchPermsAndMenus = async () => {
      const { accountPermissions, accountMenu } = Api.account;
      // const wsStore = useWsStore();
      const [menusData, permsData] = await Promise.all([accountMenu(), accountPermissions()]);
      perms.value = permsData;
      const result = generateDynamicRoutes(menusData as unknown as RouteRecordRaw[]);
      menus.value = sortMenus(result);
    };
    /** 登出 */
    const logout = async () => {
      await Api.account.accountLogout();
      closeEventSource();
      clearLoginStatus();
    };

    return {
      token,
      perms,
      menus,
      userInfo,
      login,
      afterLogin,
      logout,
      clearLoginStatus,
      setServerConnectStatus,
    };
  },
  {
    persist: {
      paths: ['token'],
    },
  },
);

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
