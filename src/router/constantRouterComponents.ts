import {RouterView} from 'vue-router'
import {markRaw} from "vue";
import {RouterTransition} from "@/components/transition";

export const constantRouterComponents = {
    '/system': markRaw(RouterTransition), // 系统管理
    '/system/access': () => import(/* webpackChunkName: "system-access" */ '@/views/auth/system/access/index.vue'), // 资源管理
    '/system/account': () => import(/* webpackChunkName: "system-account" */ '@/views/auth/system/account/index.vue'), // 账号管理
    '/system/dict': () => import(/* webpackChunkName: "system-dict" */ '@/views/auth/system/dict/index.vue'), // 字典管理
    '/system/role': () => import(/* webpackChunkName: "system-role" */ '@/views/auth/system/role/index.vue'), // 角色管理
}
