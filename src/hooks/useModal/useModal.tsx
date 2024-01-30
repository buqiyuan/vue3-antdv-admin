import { createVNode, ref, render, getCurrentInstance, nextTick } from 'vue';
import { MyModal, type MyModalInstance } from './modal';
import type { App, ComponentInternalInstance, FunctionalComponent } from 'vue';
import type { HookModalProps } from './types';

let _app: App;

export const useModal = () => {
  let _modalInstance: ComponentInternalInstance;
  const modalRef = ref<MyModalInstance>();
  const appContext = _app?._context || getCurrentInstance()?.appContext;
  // 当前模态框是否处于App.vue上下文中
  const isAppChild = ref(false);

  const getModalInstance = async () => {
    await nextTick();
    if (isAppChild.value && modalRef.value) {
      return modalRef.value;
    }

    if (_modalInstance) {
      return _modalInstance;
    }
    const container = document.createElement('div');
    const vnode = createVNode(MyModal);
    vnode.appContext = appContext;
    render(vnode, container);
    _modalInstance = vnode.component!;
    _modalInstance.props.closeModal = hide;
    return _modalInstance;
  };

  const setProps = async (_props) => {
    const instance = await getModalInstance();
    if (Object.is(instance, modalRef.value)) {
      // @ts-ignore
      instance?.setProps?.(_props);
    } else {
      // @ts-ignore
      instance?.exposed?.setProps?.(_props);
    }
  };

  const hide = () => {
    setProps({ open: false });
  };

  const show = async (props: HookModalProps) => {
    setProps({
      ...props,
      closeModal: hide,
      open: true,
    });

    await nextTick();
  };

  interface ModalRenderComp<T> extends FunctionalComponent<T> {
    show: typeof show;
    hide: typeof hide;
    setProps: typeof setProps;
  }

  const ModalRender: ModalRenderComp<HookModalProps> = (props, { attrs, slots }) => {
    isAppChild.value = true;
    return <MyModal ref={modalRef} {...{ ...attrs, ...props }} v-slots={slots} />;
  };

  ModalRender.show = show;
  ModalRender.hide = hide;
  ModalRender.setProps = setProps;

  // ;[show, hide].forEach(fn => ModalRender[fn.name] = fn)

  return [ModalRender, modalRef] as const;
};

export type ModalInstance = ReturnType<typeof useModal>;

export const installUseModal = (app: App) => {
  _app = app;
};
