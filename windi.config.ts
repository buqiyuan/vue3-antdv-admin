// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import { baseConfig } from 'windicss/config';

export default defineConfig({
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        gray: colors.gray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
    },
    cursor: {
      ...baseConfig.theme.cursor,
      'zoom-in': 'zoom-in',
    },
  },
});
