import { injectLocal, provideLocal } from '@vueuse/core';
import type { SchemaFormType } from './';

const key = Symbol('schema-form');

export async function createFormContext(instance: SchemaFormType) {
  provideLocal(key, instance);
}

export function useFormContext(formProps = {}) {
  return injectLocal(key, formProps) as SchemaFormType;
}
