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

    const onOk = async () => {
      // const values = (formRef?.formModel || {}) as any;
      try {
        const values = await formRef.value?.submit();
        await onSubmit(values);
      } catch (error) {
        modalProps?.onFail?.({} as any);
        return Promise.reject(error);
      }
    };

    const onSubmit = async (values) => {
      await modalProps?.onFinish?.(values);
      formRef.value?.resetFields();
      ModalRender.hide();
    };

    await ModalRender.show({
      destroyOnClose: true,
      ...omit(modalProps, ['onFinish', 'onFail']),
      onCancel,
      onOk,
      content: () => {
        const _formProps = Object.assign({}, { showActionButtonGroup: false }, formProps);

        return <SchemaForm ref={formRef} {..._formProps}></SchemaForm>;
      },
    });

    await nextTick();

    return [unref(formRef)] as const;
  };

  return [showModal, ModalRender] as const;
}
