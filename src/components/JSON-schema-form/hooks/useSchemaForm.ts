import type { FormSchema, FormItemSchema, FormActionType } from '../types/form';
import type { NamePath } from 'ant-design-vue/lib/form/interface';
import { ref, unref, nextTick } from 'vue';

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;

// eslint-disable-next-line
export const useSchemaForm = (props?: Partial<FormSchema>) => {
  const formRef = ref<Nullable<FormActionType>>(null);
  // eslint-disable-next-line
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error('未获取到表单实例，请确保表单实例是否注册。');
    }
    await nextTick();
    return form as FormActionType;
  }

  const methods: FormActionType = {
    scrollToField: async (name: NamePath, options?: ScrollOptions | undefined) => {
      const form = await getForm();
      form.scrollToField(name, options);
    },
    setProps: async (formProps: Partial<FormSchema>) => {
      const form = await getForm();
      form.setProps(formProps);
    },

    updateSchema: async (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => {
      const form = await getForm();
      form.updateSchema(data);
    },

    resetSchema: async (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => {
      const form = await getForm();
      form.resetSchema(data);
    },

    clearValidate: async (name?: string | string[]) => {
      const form = await getForm();
      form.clearValidate(name);
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields();
      });
    },

    removeSchemaByFiled: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByFiled(field);
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm();
      form.setFieldsValue<T>(values);
    },

    appendSchemaByField: async (
      schema: FormItemSchema,
      prefixField: string | undefined,
      first: boolean,
    ) => {
      const form = await getForm();
      form.appendSchemaByField(schema, prefixField, first);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },

    validate: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validate(nameList);
    },

    validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validateFields(nameList);
    },
  };

  return [formRef, methods] as const;
};
