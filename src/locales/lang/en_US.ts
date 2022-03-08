import antdLocale from 'ant-design-vue/es/locale/en_US';
import { genMessage } from '../helper';

const modulesFiles = require.context('./en-US', true, /\.ts$/);

export default {
  message: {
    ...genMessage(modulesFiles, 'en-US'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en-US',
};
