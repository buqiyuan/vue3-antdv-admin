import { defineStore } from 'pinia';
import { useWsStore } from './ws';
import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import Api from '@/api/';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { resetRouter } from '@/router';
import { generateDynamicRoutes } from '@/router/helper/routeHelper';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.UserEntity>;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: 'amdin',
    avatar: '',
    perms: [],
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },
  },
  actions: {
    /** 清空token及用户信息 */
    resetToken() {
      this.avatar = this.token = this.name = '';
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },
    /** 登录成功保存token */
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    /** 登录 */
    async login(params: API.LoginDto) {
      try {
        const data = await Api.auth.authLogin(params);
        this.setToken(data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      try {
        const { accountPermissions, accountProfile, accountMenu } = Api.account;
        // const wsStore = useWsStore();
        const [userInfo, menus, perms] = await Promise.all([
          accountProfile(),
          accountMenu(),
          accountPermissions(),
        ]);
        this.perms = perms;
        this.menus = generateDynamicRoutes(menus as unknown as RouteRecordRaw[]);
        this.name = userInfo.username;
        this.avatar = userInfo.avatar;
        this.userInfo = userInfo;

        return { menus, perms, userInfo };
      } catch (error) {
        return Promise.reject(error);
        // return this.logout();
      }
    },
    /** 登出 */
    async logout() {
      await Api.account.accountLogout();
      const wsStore = useWsStore();
      wsStore.closeSocket();
      this.resetToken();
      resetRouter();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
