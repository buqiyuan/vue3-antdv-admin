import buttonProps from 'ant-design-vue/es/button/buttonTypes';
import type { ButtonType as AButtonType } from 'ant-design-vue/es/button/buttonTypes';
import type { ExtractPropTypes } from 'vue';

export type ButtonType = AButtonType | 'warning' | 'success';

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;

export const typeColorMap = {
  warning: 'var(--ant-warning-color)',
  success: 'var(--ant-success-color)',
} as const;

export const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];

export { buttonProps };
