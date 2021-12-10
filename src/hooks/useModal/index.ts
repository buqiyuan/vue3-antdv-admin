import type { App, ComponentInternalInstance } from 'vue';
import { createVNode, render, getCurrentInstance, nextTick } from 'vue';
import { MyModal } from './modal';
import type { HookModalProps } from './types';
export { useFormModal } from './useFormModal';

let _app: App;

export const useModal = () => {
  let _modalInstance: ComponentInternalInstance;
  const appContext = _app._context || getCurrentInstance()?.appContext;

  const getModalInstance = () => {
    if (_modalInstance) {
      return _modalInstance;
    }
    const container = document.createElement('div');
    const vnode = createVNode(MyModal);
    vnode.appContext = appContext;
    render(vnode, container);
    _modalInstance = vnode.component!;
    _modalInstance.props._closeModal = hide;
    return _modalInstance;
  };

  const hide = () => {
    Object.assign<any, HookModalProps>(_modalInstance?.props, { visible: false });
  };

  const show = async (props: HookModalProps) => {
    const modalInstance = getModalInstance();

    Object.assign<any, HookModalProps>(modalInstance?.props, {
      ...props,
      visible: true,
    });
    await nextTick();
  };

  return {
    show,
    hide,
  };
};

export type ModalInstance = ReturnType<typeof useModal>;

export const install = (app: App) => {
  _app = app;
};

export default install;
