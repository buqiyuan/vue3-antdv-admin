import { nextTick, ref, unref } from 'vue';
import { omit } from 'lodash-es';
import { useModal } from './useModal';
import type { SchemaFormInstance, SchemaFormProps } from '@/components/core/schema-form';
import type { FormModalProps } from './types';
import SchemaForm from '@/components/core/schema-form';

interface ShowModalProps<T = Recordable> {
  modalProps: FormModalProps<T>;
  formProps: Partial<SchemaFormProps>;
}

export function useFormModal<T = any>() {
  const [ModalRender] = useModal();

  const showModal = async <P extends T>({ modalProps, formProps }: ShowModalProps<P>) => {
    const formRef = ref<SchemaFormInstance>();

    const onCancel = (e: MouseEvent) => {
      formRef.value?.resetFields();
      modalProps?.onCancel?.(e);
    };

    await ModalRender.show({
      destroyOnClose: true,
      ...omit(modalProps, ['onFinish', 'onFail']),
      onCancel,
      content: () => {
        const _formProps = Object.assign({}, { showActionButtonGroup: false }, formProps);

        return <SchemaForm ref={formRef} {..._formProps}></SchemaForm>;
      },
      onOk: async () => {
        // const values = (formRef?.formModel || {}) as any;
        let values: any;
        try {
          values = await formRef.value?.validate();
          await modalProps?.onFinish?.(values);
          formRef.value?.resetFields();
        } catch (error) {
          modalProps?.onFail?.(values);
          return Promise.reject(error);
        }
      },
    });

    await nextTick();

    return [unref(formRef)] as const;
  };

  return [showModal, ModalRender] as const;
}
