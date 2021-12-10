import type { PopconfirmProps } from 'ant-design-vue/es/popconfirm';
import type { ButtonProps, TooltipProps } from 'ant-design-vue/lib/components';
import { ColumnParams } from '../typing';

export interface ActionItem extends Omit<ButtonProps, 'onClick'> {
  onClick?: Fn<ColumnParams, any>;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  // auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
}

export interface PopConfirm extends PopconfirmProps {
  title: string;
  okText?: string;
  cancelText?: string;
  onConfirm: Fn<ColumnParams, any>;
  onCancel?: Fn<ColumnParams, any>;
  icon?: string;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottomRight';
}
