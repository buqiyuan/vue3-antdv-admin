// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import { baseConfig } from 'windicss/config';

// https://windicss.org/features/
export default defineConfig({
  darkMode: 'class', // or 'media'
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden overflow-ellipsis',
  },
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
      ...baseConfig.theme?.cursor,
      'zoom-in': 'zoom-in',
    },
  },
});
