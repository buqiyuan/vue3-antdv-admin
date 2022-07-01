import antdLocale from 'ant-design-vue/es/locale/en_US';
import { genMessage } from '../helper';

const modulesFiles = import.meta.globEager('./en-US/**/*.ts');

export default {
  message: {
    ...genMessage(modulesFiles, 'en-US'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en-US',
};
