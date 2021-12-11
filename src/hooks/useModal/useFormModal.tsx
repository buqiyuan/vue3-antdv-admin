import { useModal } from './index';
import { nextTick, ref } from 'vue';
import { SchemaForm } from '@/components/JSON-schema-form';
import type { SchemaFormRef, FormSchema } from '@/components/JSON-schema-form';
import type { FormModalProps } from './types';

interface ShowModalProps {
  modalProps: FormModalProps;
  formSchema: FormSchema;
}

export const useFormModal = () => {
  const { show } = useModal();

  const showModal = async ({ modalProps, formSchema }: ShowModalProps) => {
    const formRef = ref<SchemaFormRef>();

    const onCancel = (e: MouseEvent) => {
      formRef.value?.resetFields();
      modalProps?.onCancel?.(e);
    };

    await show({
      destroyOnClose: true,
      ...modalProps,
      onCancel,
      content: () => <SchemaForm ref={formRef} formSchema={formSchema}></SchemaForm>,
      onOk: async () => {
        const values = formRef.value?.formModel || {};
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
};
