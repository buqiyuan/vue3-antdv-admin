import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { login } from '@/api/login';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { logout, getInfo, permmenu } from '@/api/account';
import { generatorDynamicRouter } from '@/router/generator-router';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
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
    // 登录成功保存token
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    // 登录
    async login(params: API.LoginParams) {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 登录成功之后, 获取用户信息以及生成权限路由
    async afterLogin() {
      try {
        const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
        this.perms = perms;
        this.name = userInfo.name;
        this.avatar = userInfo.headImg;
        this.userInfo = userInfo;
        // 生成路由
        const routes = generatorDynamicRouter(menus);
        this.menus = routes;
        console.log('routes', routes);
        // router.push('/sys/permission/role')
        return { menus, perms, userInfo };
      } catch (error) {
        return this.logout();
      }
    },
    // 登出
    async logout() {
      await logout();
      Storage.clear();
    },
  },
});
