import { defineComponent, watch, ref, computed, unref } from 'vue';
import { omit } from 'lodash-es';
import { ConfigProvider } from 'ant-design-vue';
import type { HookModalProps } from './types';
import { isFunction } from '@/utils/is';
import { DraggableModal } from '@/components/core/draggable-modal';
import { useLocale } from '@/locales/useLocale';

export type MyModalInstance = InstanceType<typeof MyModal>;

export const MyModal = defineComponent({
  components: { customModal: DraggableModal },
  props: {
    content: {
      type: [String, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    },
    closeModal: Function,
    visible: Boolean,
    isAppChild: Boolean,
  },
  setup(props, { attrs, expose }) {
    const confirmLoading = ref<boolean>(false);
    const { getAntdLocale } = useLocale();

    const propsRef = ref({ ...attrs, ...props });

    const getProps = computed(() => {
      return { ...attrs, ...props, ...unref(propsRef) };
    });

    const bindValues = computed(() => {
      const _props = unref(getProps);

      return {
        ...omit(_props, ['onCancel', 'onOk', 'closeModal', 'isAppChild', 'content']),
        visible: _props.visible,
        confirmLoading: confirmLoading.value,
        onCancel: handleCancel,
        onOk: handleConfirm,
      };
    });

    const setVisible = (visible: boolean) => {
      propsRef.value.visible = visible;
    };

    const setProps = (props: HookModalProps) => {
      propsRef.value = {
        ...unref(getProps),
        ...props,
      };
    };

    watch(
      () => propsRef.value.visible,
      (val) => {
        Object.is(val, false) && props.closeModal?.();
      },
    );

    const handleConfirm = async (e: MouseEvent) => {
      confirmLoading.value = true;
      try {
        // @ts-ignore
        await unref(getProps)?.onOk?.(e);
        setVisible(false);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        confirmLoading.value = false;
      }
    };
    const handleCancel = async (e: MouseEvent) => {
      // @ts-ignore
      await unref(getProps)?.onCancel?.(e);
      setVisible(false);
    };

    expose({
      setProps,
    });

    return () => {
      const _props = unref(getProps);
      const { content, isAppChild } = _props;

      const Content = isFunction(content) ? content() : content;

      return isAppChild ? (
        <customModal {...unref(bindValues)}>{Content}</customModal>
      ) : (
        <ConfigProvider locale={getAntdLocale.value}>
          <customModal {...unref(bindValues)}>{Content}</customModal>
        </ConfigProvider>
      );
    };
  },
});
