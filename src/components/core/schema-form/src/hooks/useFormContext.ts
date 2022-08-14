import { provide, inject } from 'vue';
import type { SchemaFormType } from './';

const key = Symbol('schema-form');

export async function createFormContext(instance: SchemaFormType) {
  provide(key, instance);
}

export function useFormContext(formProps = {}) {
  return inject(key, formProps) as SchemaFormType;
}
