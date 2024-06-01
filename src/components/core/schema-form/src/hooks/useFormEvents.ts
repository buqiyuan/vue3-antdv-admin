import { unref } from 'vue';
import { useFormContext } from './useFormContext';
import { isFunction } from '@/utils/is';

export type FormEvents = ReturnType<typeof useFormEvents>;

export function useFormEvents() {
  const schemaFormContext = useFormContext();
  const { emit, getFormProps, schemaFormRef } = schemaFormContext;

  async function handleSubmit(e?: Event) {
    e?.preventDefault?.();
    const { submitFunc } = unref(getFormProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(schemaFormRef);
    if (!formEl) return;
    try {
      const values = await schemaFormContext.validate();
      const res = schemaFormContext.handleFormValues(values);
      emit('submit', res);
      return res;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return {
    submit: handleSubmit,
  };
}
