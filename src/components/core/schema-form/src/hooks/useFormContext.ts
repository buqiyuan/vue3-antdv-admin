import { injectLocal, provideLocal } from '@vueuse/core';
import type { FormMethods } from './useFormMethods';
import type { FormState } from './useFormState';

export interface SchemaFormInstance extends FormMethods, FormState {}

const key = Symbol('schema-form');

export async function createFormContext(instance: SchemaFormInstance) {
  provideLocal(key, instance);
}

export function useFormContext(formProps = {}) {
  return injectLocal(key, formProps) as SchemaFormInstance;
}
