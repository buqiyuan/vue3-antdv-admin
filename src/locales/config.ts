export type LocaleType = keyof typeof localeMap;

export const localeMap = {
  zh_CN: 'zh_CN',
  en: 'en',
} as const;

export const localeList = [
  {
    lang: localeMap.en,
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  {
    lang: localeMap.zh_CN,
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
] as const;
