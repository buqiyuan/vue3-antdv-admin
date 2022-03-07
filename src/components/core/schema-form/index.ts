// export { default as SchemaForm } from './schema-form.vue'
import SchemaForm from './schema-form.vue';

export * from './types/form';
export * from './types/formItem';

export { SchemaForm };

export type SchemaFormRef = InstanceType<typeof SchemaForm>;
