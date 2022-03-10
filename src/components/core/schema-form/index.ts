// export { default as SchemaForm } from './schema-form.vue'
import SchemaForm from './schema-form.vue';

export * from './types/form';
export * from './types/formItem';

export { SchemaForm };

export default SchemaForm;

export type SchemaFormInstance = InstanceType<typeof SchemaForm>;
