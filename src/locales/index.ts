import { createI18n } from 'vue-i18n';
import { localeMap } from './config';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import type { App } from 'vue';
import { useLocaleStoreWithOut } from '@/store/modules/locale';

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    locale,
    // legacy: false,
    fallbackLocale: localeMap.zh_CN, // set fallback locale
    messages: {
      [locale]: message as { [key: string]: string },
    },
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

const options = await createI18nOptions();
export const i18n = createI18n(options);

// setup i18n instance with global
export function setupI18n(app: App) {
  app.use(i18n);
}
