import { i18n } from '@/locales';
import { Title18n } from 'types/vue-router';

/**
 * 国际化转换工具函数，主要用于处理动态路由的title
 * @param {string | Title18n} message message
 * @param isI18n  默认为true，获取对应的翻译文本,否则返回本身
 * @returns message
 */
export function transformI18n(message: string | Title18n = '', isI18n = true) {
  if (!message) {
    return '';
  }

  // 处理动态路由的title, 格式 {zh_CN:"",en_US:""}
  if (typeof message === 'object') {
    return message[i18n.global?.locale];
  }

  if (isI18n && typeof message === 'string') {
    return i18n.global.t(message);
  }
  return message;
}

// 主要用于配合vscode i18nn ally插件的提示。此功能仅用于路由和菜单。请在其他地方使用 vue-i18n 的 useI18n
export const t = (key: string) => key;
