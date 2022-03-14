import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { isEmpty } from 'lodash-es';
import type { Ref } from 'vue';
import type { UseFormReturnType } from '../types/form';
import type { SchemaFormInstance, SchemaFormProps } from '../schema-form';

export function useForm(props?: SchemaFormProps): UseFormReturnType {
  const formRef = ref<SchemaFormInstance>({} as SchemaFormInstance);
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    if (isEmpty(form)) {
      console.error('未获取表单实例!');
    }
    await nextTick();
    return form;
  }

  function register(instance: SchemaFormInstance) {
    onUnmounted(() => {
      // @ts-ignore
      formRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance?.setSchemaFormProps(props);
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const methods = new Proxy<Ref<SchemaFormInstance>>(formRef, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (Reflect.has(target.value, key)) {
        return target.value[key];
      }
      return async (...rest) => {
        const form = await getForm();
        return form?.[key](...rest);
      };
    },
  });

  return [register, unref(methods)];
}
