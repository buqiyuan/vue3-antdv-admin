import { nextTick, ref, unref, watch } from 'vue';
import { isEmpty } from 'lodash-es';
import SchemaForm from '../schema-form.vue';
import type { FunctionalComponent, Ref } from 'vue';
import type { SchemaFormProps } from '../schema-form';

type SchemaFormInstance = InstanceType<typeof SchemaForm>;

export function useForm(props?: Partial<SchemaFormProps>) {
  const formRef = ref<SchemaFormInstance>({} as SchemaFormInstance);

  async function getFormInstance() {
    await nextTick();
    const form = unref(formRef);
    if (isEmpty(form)) {
      console.error('未获取表单实例!');
    }
    return form;
  }
  watch(
    () => props,
    async () => {
      if (props) {
        await nextTick();
        const formInstance = await getFormInstance();
        // console.log('form onMounted');
        formInstance.setSchemaFormProps?.(props);
      }
    },
    {
      immediate: true,
      deep: true,
      flush: 'post',
    },
  );

  const methods = new Proxy<Ref<SchemaFormInstance>>(formRef, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key);
      }
      return async (...rest) => {
        const form = await getFormInstance();
        return form?.[key]?.(...rest);
      };
    },
  });

  const SchemaFormRender: FunctionalComponent<SchemaFormProps> = (compProps, { attrs, slots }) => {
    return (
      <SchemaForm
        ref={formRef}
        {...{ ...attrs, ...props, ...compProps }}
        v-slots={slots}
      ></SchemaForm>
    );
  };

  return [SchemaFormRender, unref(methods)] as const;
}
