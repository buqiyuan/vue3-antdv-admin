module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    'lodash',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
        css: true,
      },
      'ant-design-vue',
    ],
  ],
};
