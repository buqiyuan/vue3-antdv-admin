import { getAsyncPage } from '@/utils/common';

/**
 * system module
 */
export default {
  'views/system/permission/user': getAsyncPage('system/permission/user'),
  'views/system/permission/menu': getAsyncPage('system/permission/menu'),
  'views/system/permission/role': getAsyncPage('system/permission/role'),
  'views/system/monitor/req-log': getAsyncPage('system/monitor/req-log'),
  'views/system/monitor/online': getAsyncPage('system/monitor/online'),
  'views/system/monitor/login-log': getAsyncPage('system/monitor/login-log'),
  'views/system/monitor/serve': getAsyncPage('system/monitor/serve'),
  'views/system/schedule/task': getAsyncPage('system/schedule/task'),
  'views/system/schedule/log': getAsyncPage('system/schedule/log'),
};
