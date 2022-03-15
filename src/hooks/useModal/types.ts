import type { ModalProps } from 'ant-design-vue';

// 普通模态框
export interface HookModalProps extends Partial<ModalProps> {
  /** 当前模态框是否处于App.vue上下文中 */
  isAppChild?: boolean;
  content?: string | JSX.Element | (() => JSX.Element);
  closeModal?: () => void;
}

// 表单模态框
export interface FormModalProps<T = any> extends HookModalProps {
  /**
   * 接受返回一个boolean，返回 true 会关掉这个弹窗
   *
   * @name 表单结束后调用
   */
  onFinish?: (formData: T) => Promise<boolean | void>;
  /**
   * 接受返回一个boolean，返回 true 会关掉这个弹窗
   *
   * @name 表单验证失败时调用
   */
  onFail?: (formData: T) => any;
}
