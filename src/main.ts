import './polyfill';
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupIcons } from './components/basic/icon';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
import { setupAntd, setupAssets, setupGlobalMethods } from '@/plugins';

const app = createApp(App);

function setupPlugins() {
  // 安装图标
  setupIcons();
  // 注册全局常用的ant-design-vue组件
  setupAntd(app);
  // 引入静态资源
  setupAssets();
  // 注册全局方法，如：app.config.globalProperties.$message = message
  setupGlobalMethods(app);
}

async function setupApp() {
  // 通过动态import可生成单独的chunk，结合全局替换变量，可实现按需加载，且不会对代码打包体积造成影响
  if (import.meta.env.VITE_MOCK_IN_PROD === 'true') {
    const { setupMock } = await import('../mocks/');
    // 启用 mock
    await setupMock();
  }

  // 挂载vuex状态管理
  setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);
  // 挂载路由
  await setupRouter(app);

  app.mount('#app');
}

setupPlugins();

setupApp();
