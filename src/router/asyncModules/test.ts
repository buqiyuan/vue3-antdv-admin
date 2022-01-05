import { getAsyncPage } from '@/utils/common';

const prefix = 'shared/demos/';

export default {
  'views/shared/demos/form/rule-form.vue': getAsyncPage(`${prefix}form/rule-form/index.vue`), // 验证表单
  'views/shared/demos/icons/Iconfont.vue': getAsyncPage(`${prefix}icons/Iconfont.vue`), // 自定义图标
  [`views/${prefix}tables/lol-table/index.vue`]: getAsyncPage(`${prefix}tables/lol-table`), // lol
  [`views/${prefix}tables/wzry-table/index.vue`]: getAsyncPage(`${prefix}tables/wzry-table`), // wzry
  [`views/${prefix}tables/search-table/index.vue`]: getAsyncPage(`${prefix}tables/search-table`), // search-table
  'views/shared/demos/button.vue': getAsyncPage(`${prefix}button.vue`), // 自定义按钮
  'views/shared/demos/custom-modal.vue': getAsyncPage(`${prefix}custom-modal.vue`), // 自定义模态框
};

// export const constantRouterComponents = {
//   '/system': RouterTransition, // 系统管理
//   '/system/access': () =>
//     import(/* webpackChunkName: "system-access" */ '@/views/auth/system/access/index.vue'), // 资源管理
//   '/system/account': () =>
//     import(/* webpackChunkName: "system-account" */ '@/views/auth/system/account/index.vue'), // 账号管理
//   '/system/dict': () =>
//     import(/* webpackChunkName: "system-dict" */ '@/views/auth/system/dict/index.vue'), // 字典管理
//   '/system/role': () =>
//     import(/* webpackChunkName: "system-role" */ '@/views/auth/system/role/index.vue') // 角色管理
// }
