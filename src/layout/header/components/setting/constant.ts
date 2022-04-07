export const themeStyle = [
  {
    label: '亮色主题风格',
    value: 'light',
  },
  {
    label: '暗色主题风格',
    value: 'dark',
  },
  {
    label: '暗黑模式',
    value: 'realDark',
  },
] as const;

/** 主题色 */
export const themeColors = [
  {
    title: '拂晓蓝（默认）',
    key: 'daybreak',
    value: 'rgb(24, 144, 255)',
  },
  {
    title: '薄暮',
    key: 'dust',
    value: 'rgb(245, 34, 45)',
  },
  {
    title: '火山',
    key: 'volcano',
    value: 'rgb(250, 84, 28)',
  },
  {
    title: '日暮',
    key: 'sunset',
    value: 'rgb(250, 173, 20)',
  },
  {
    title: '明青',
    key: 'cyan',
    value: 'rgb(19, 194, 194)',
  },
  {
    title: '极光绿',
    key: 'green',
    value: 'rgb(82, 196, 26)',
  },
  {
    title: '极客蓝',
    key: 'geekblue',
    value: 'rgb(47, 84, 235)',
  },
  {
    title: '酱紫',
    key: 'purple',
    value: 'rgb(114, 46, 209)',
  },
] as const;

/** 导航模式（布局方式） */
export const layouts = [
  {
    label: '侧边菜单布局',
    value: 'sidemenu',
  },
  {
    label: '顶部菜单布局',
    value: 'topmenu',
  },
] as const;
