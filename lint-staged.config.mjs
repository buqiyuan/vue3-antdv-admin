/** @type {import('lint-staged').Config} */
export default {
  '*.{js,jsx,ts,tsx,vue,json,md,less,css}': ['vp lint --fix', 'vp fmt'],
};
