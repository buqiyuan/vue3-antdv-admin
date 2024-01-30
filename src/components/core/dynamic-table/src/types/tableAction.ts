import type { Ref } from 'vue';
import type { CustomRenderParams } from './column';
import type { PopconfirmProps } from 'ant-design-vue/es/popconfirm';
import type { ButtonProps, TooltipProps } from 'ant-design-vue/es/components';
import type { TableMethods, UseEditableType } from '../hooks/';
import type { PermissionType } from '@/permission/permCode';
import type { ButtonType } from '@/components/basic/button';

export type ActionItem = Omit<ButtonProps, 'onClick' | 'loading' | 'type'> & {
  onClick?: Fn<CustomRenderParams, any>;
  label?: string;
  color?: string;
  type?: ButtonType;
  loading?: Ref<ButtonProps['loading']> | ButtonProps['loading'];
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  // auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
  /** 设置按钮权限, effect不传默认为disable */
  auth?:
    | PermissionType
    | {
        perm: PermissionType;
        /** 无权限时，按钮不可见或是处于禁用状态 */
        effect?: 'delete' | 'disable';
      };
};

export type PopConfirm = PopconfirmProps & {
  title: string;
  okText?: string;
  cancelText?: string;
  onConfirm: Fn<CustomRenderParams, any>;
  onCancel?: Fn<CustomRenderParams, any>;
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
};

export type TableActionType = {
  /** 刷新并清空,页码也会重置，不包括搜索表单 */
  reload: TableMethods['reload'];
  /** 设置动态表格属性 */
  setProps: TableMethods['setProps'];
  /** 获取远程数据 */
  fetchData: TableMethods['fetchData'];
  /** 进入编辑状态 */
  startEditable: UseEditableType['startEditable'];
  /** 取消编辑 */
  cancelEditable: UseEditableType['cancelEditable'];
  /** 获取编辑后表单的值 */
  getEditFormModel: UseEditableType['getEditFormModel'];
  /** 当前行是否处于编辑状态 */
  isEditable: UseEditableType['isEditable'];
  /** 行编辑表单是否校验通过 */
  validateRow: UseEditableType['validateRow'];
};
