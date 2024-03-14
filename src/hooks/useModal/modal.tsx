import { defineComponent, watch, ref, computed, unref } from 'vue';
import { omit } from 'lodash-es';
import type { HookModalProps } from './types';
import { isFunction } from '@/utils/is';
import { DraggableModal } from '@/components/core/draggable-modal';

export type MyModalInstance = InstanceType<typeof MyModal>;

export const MyModal = defineComponent({
  props: {
    content: {
      type: [String, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    },
    closeModal: Function as PropType<HookModalProps['closeModal']>,
    open: Boolean,
  },
  setup(props, { attrs, expose }) {
    const confirmLoading = ref<boolean>(false);

    const propsRef = ref<HookModalProps>({ ...attrs, ...props });

    const getProps = computed(() => {
      return { ...attrs, ...props, ...unref(propsRef) };
    });

    const bindValues = computed(() => {
      const _props = unref(getProps);

      return {
        ...omit(_props, ['onCancel', 'onOk', 'closeModal', 'content']),
        open: _props.open,
        confirmLoading: confirmLoading.value,
        onCancel: handleCancel,
        onOk: handleConfirm,
      };
    });

    const setVisible = (open: boolean) => {
      propsRef.value.open = open;
    };

    const setProps = (props: HookModalProps) => {
      propsRef.value = {
        ...unref(getProps),
        ...props,
      };
    };

    watch(
      () => propsRef.value.open,
      (val) => {
        Object.is(val, false) && props.closeModal?.();
      },
    );

    const handleConfirm = async (e: MouseEvent) => {
      confirmLoading.value = true;
      try {
        await unref(getProps)?.onOk?.(e);
        setVisible(false);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        confirmLoading.value = false;
      }
    };
    const handleCancel = async (e: MouseEvent) => {
      await unref(getProps)?.onCancel?.(e);
      setVisible(false);
    };

    expose({
      setProps,
    });

    return () => {
      const _props = unref(getProps);
      const { content } = _props;

      const Content = isFunction(content) ? content() : content;

      return <DraggableModal {...unref(bindValues)}>{Content}</DraggableModal>;
    };
  },
});
