import type { DefaultIconsType } from './icons.data';

export const svgIconProps = {
  prefix: {
    type: String,
    default: 'svg-icon',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
};

export const iconPickerProps = {
  value: {
    type: String as PropType<DefaultIconsType>,
  },
  placeholder: String,
};

export type IconProps = {
  type?: 'svg' | 'iconify' | 'icon-font';
  icon: DefaultIconsType | string;
  color?: string;
  size?: string | number;
};
