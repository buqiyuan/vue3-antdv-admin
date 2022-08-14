import SchemaForm from './src/schema-form.vue';
import SchemaFormItem from './src/schema-form-item.vue';
import type { DefineComponent } from 'vue';
import type { SchemaFormProps } from './src/schema-form';

export * from './src/types/';
export * from './src/schema-form';
export * from './src/schema-form-item';
export * from './src/hooks/';
export * from './src/components/';

export { SchemaForm, SchemaFormItem };

// TODO 暂时是为了解决ts error(如果你有解决方法 请务必联系我~): JSX element type 'SchemaForm' does not have any construct or call signatures.
export default SchemaForm as unknown as DefineComponent<Partial<SchemaFormProps>>;
