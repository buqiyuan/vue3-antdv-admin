import { nextTick, ref, unref, watch, onMounted } from 'vue';
import { isEmpty } from 'lodash-es';
import SchemaForm from '../../index';
import type { Ref, SetupContext } from 'vue';
import type { SchemaFormInstance, SchemaFormProps } from '../schema-form';

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
    () => {
      props &&
        onMounted(async () => {
          // console.log('form onMounted');
          (await getFormInstance())?.setSchemaFormProps(props);
        });
    },
    {
      immediate: true,
      deep: true,
    },
  );

  const methods = new Proxy<Ref<SchemaFormInstance>>(formRef, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (Reflect.has(target.value, key)) {
        return target.value[key];
      }
      return async (...rest) => {
        const form = await getFormInstance();
        return form?.[key](...rest);
      };
    },
  });

  const SchemaFormRender = (
    compProps: Partial<SchemaFormProps>,
    { attrs, slots }: SetupContext,
  ) => {
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
