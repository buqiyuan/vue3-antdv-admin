import type { FormItemProps as AntdFormItemProps } from 'ant-design-vue/es/form/FormItem';
import type { HTMLAttributes } from 'vue';
import type { ColProps } from 'ant-design-vue/es/grid/Col';

export interface FormItemProps extends AntdFormItemProps {
  labelCol?: ColProps & HTMLAttributes;
}
