import CustomAModal from '@/components/a-custom-modal/index.vue';
import { defineComponent, reactive, watchEffect, watch, ref } from 'vue';
import type { HookModalProps } from './types';
import { isFunction } from '@/utils/is';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import { omit } from 'lodash';

export const MyModal = defineComponent({
  components: { modal: CustomAModal },
  setup(props: HookModalProps) {
    const confirmLoading = ref<boolean>(false);

    const state = reactive({
      visible: props.visible,
    });

    watchEffect(() => {
      state.visible = props.visible;
    });

    watch(
      () => state.visible,
      (val) => {
        Object.is(val, false) && props._closeModal?.();
      },
    );

    const handleConfirm = async (e: MouseEvent) => {
      confirmLoading.value = true;
      try {
        await props?.onOk?.(e);
        state.visible = false;
      } catch (error) {
      } finally {
        confirmLoading.value = false;
      }
    };
    const handleCancel = async (e: MouseEvent) => {
      await props?.onCancel?.(e);
      state.visible = false;
    };

    return () => {
      return (
        <ConfigProvider locale={zhCN}>
          <modal
            {...omit(props, ['onCancel', 'onOk'])}
            v-model={[state.visible, 'visible']}
            confirmLoading={confirmLoading.value}
            onCancel={handleCancel}
            onOk={handleConfirm}
          >
            {isFunction(props.content) ? props.content() : props.content}
          </modal>
        </ConfigProvider>
      );
    };
  },
});
