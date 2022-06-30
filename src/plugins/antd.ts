import type { App } from 'vue';

import { AButton } from '@/components/basic/button/index';

// https://www.antdv.com/docs/vue/getting-started-cn#按需加载
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'dayjs/locale/zh-cn';

export function setupAntd(app: App<Element>) {
  app.component('AButton', AButton);
}
