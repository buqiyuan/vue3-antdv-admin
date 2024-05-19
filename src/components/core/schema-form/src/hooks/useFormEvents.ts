import { unref } from 'vue';
import type { FormState, SchemaFormType } from './index';
import type { SchemaFormEmitFn } from '../schema-form';
import { isFunction } from '@/utils/is';

type UseFormActionContext = FormState & {
  schemaFormContext: SchemaFormType;
  emit: SchemaFormEmitFn;
};

export type FormEvents = ReturnType<typeof useFormEvents>;

export function useFormEvents(formActionContext: UseFormActionContext) {
  const { emit, getFormProps, schemaFormRef, schemaFormContext } = formActionContext;

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
