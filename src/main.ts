import { createApp } from 'vue';
import { setupMock } from '../mocks/';
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
  // 启用 mock
  await setupMock();
  fetch(`${import.meta.env.VITE_BASE_API_URL}/user/1`).then((r) => r.json());

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
