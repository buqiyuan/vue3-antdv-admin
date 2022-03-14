import { nextTick, ref } from 'vue';
import { useModal } from './useModal';
import type { SchemaFormInstance, SchemaFormProps } from '@/components/core/schema-form';
import type { FormModalProps } from './types';
import { SchemaForm } from '@/components/core/schema-form';

interface ShowModalProps<T = Recordable> {
  modalProps: FormModalProps<T>;
  formProps: Partial<SchemaFormProps>;
}

export function useFormModal<T extends Recordable>() {
  const { show } = useModal();

  const showModal = async <P extends T>({ modalProps, formProps }: ShowModalProps<P>) => {
    const formRef = ref<SchemaFormInstance>();

    const onCancel = (e: MouseEvent) => {
      formRef.value?.resetFields();
      modalProps?.onCancel?.(e);
    };

    await show({
      destroyOnClose: true,
      ...modalProps,
      onCancel,
      content: () => {
        const _formProps = Object.assign({}, { showActionButtonGroup: false }, formProps);

        return <SchemaForm ref={formRef} {..._formProps}></SchemaForm>;
      },
      onOk: async () => {
        const values = (formRef.value?.formModel || {}) as any;
        try {
          await formRef.value?.validate();
          await modalProps?.onFinish?.({ ...values });
          formRef.value?.resetFields();
        } catch (error) {
          modalProps?.onFail?.({ ...values });
          return Promise.reject(error);
        }
      },
    });

    await nextTick();

    return [formRef] as const;
  };

  return [showModal] as const;
}
