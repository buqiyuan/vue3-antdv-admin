/**
 * system module
 */
export default {
  'views/system/permission/user': () => import('@/views/system/permission/user/index.vue'),
  'views/system/permission/menu': () => import('@/views/system/permission/menu/index.vue'),
  'views/system/permission/role': () => import('@/views/system/permission/role/index.vue'),
  'views/system/monitor/req-log': () => import('@/views/system/monitor/req-log/index.vue'),
  'views/system/monitor/online': () => import('@/views/system/monitor/online/index.vue'),
  'views/system/monitor/login-log': () => import('@/views/system/monitor/login-log/index.vue'),
  'views/system/monitor/serve': () => import('@/views/system/monitor/serve/index.vue'),
  'views/system/schedule/task': () => import('@/views/system/schedule/task/index.vue'),
  'views/system/schedule/log': () => import('@/views/system/schedule/log/index.vue'),
};
