import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import { genMessage } from '../helper';

const modulesFiles = require.context('./zh-CN', true, /\.ts$/);

export default {
  message: {
    ...genMessage(modulesFiles, 'zh-CN'),
    antdLocale,
  },
};
