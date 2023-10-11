import buttonProps from 'ant-design-vue/es/button/buttonTypes';
import { theme } from 'ant-design-vue';
import type { ButtonType as AButtonType } from 'ant-design-vue/es/button/buttonTypes';
import type { ExtractPropTypes } from 'vue';

const { defaultSeed } = theme;

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;

export type ButtonType = AButtonType | 'warning' | 'success' | 'error';

/** 这里自定义颜色 */
export const buttonColorPrimary = {
  success: defaultSeed.colorSuccess,
  warning: defaultSeed.colorWarning,
  error: defaultSeed.colorError,
} as const;

export const aButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];

export type { AButtonType };
export { buttonProps };
