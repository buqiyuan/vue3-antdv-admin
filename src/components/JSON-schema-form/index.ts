export * from './types/form';
export * from './types/formItem';

// export { default as SchemaForm } from './schema-form.vue'
import SchemaForm from './schema-form.vue';

export { SchemaForm };

export type SchemaFormRef = InstanceType<typeof SchemaForm>;
