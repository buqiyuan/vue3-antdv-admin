import { injectLocal, provideLocal } from '@vueuse/core';
import type { DynamicTableType } from '../types';

const key = Symbol('dynamic-table');

export function createTableContext(instance: DynamicTableType) {
  provideLocal(key, instance);
}

export function useTableContext() {
  return injectLocal(key) as DynamicTableType;
}
