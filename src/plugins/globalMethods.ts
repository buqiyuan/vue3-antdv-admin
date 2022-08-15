import type { App } from 'vue';

// import useFormModal from '@/hooks/useFormModal'
// import useModal from '@/hooks/useModal/index';
import permission from '@/core/permission/';
/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app: App) {
  app.use(permission);
  // app.use(useFormModal)
  // app.use(useModal);
  // 全局挂载Reflect反射对象,以便在vue模板中使用
  app.config.globalProperties.Reflect = Reflect;
}
