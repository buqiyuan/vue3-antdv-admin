import { App } from 'vue';

import { SvgIcon } from '@/components/svg-icon';
import { IconFont } from '@/components/iconfont';

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component(SvgIcon.name, SvgIcon);
  app.component(IconFont.name, IconFont);
}
