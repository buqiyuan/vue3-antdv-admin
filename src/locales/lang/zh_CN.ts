import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modulesFiles = require.context('./zh-CN', true, /\.ts$/);

export default {
  message: {
    ...genMessage(modulesFiles, 'zh-CN'),
    antdLocale,
  },
};
