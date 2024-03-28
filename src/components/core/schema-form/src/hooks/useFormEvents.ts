import { unref, toRaw } from 'vue';
import { cloneDeep, isNil, set, uniqBy, unset } from 'lodash-es';
import dayjs from 'dayjs';
import { dateItemType, handleInputNumberValue } from '../helper';
import type { UnwrapFormSchema } from '../types/form';
import type { NamePath } from 'ant-design-vue/lib/form/interface';
import type { FormState, FormMethods } from './index';
import type { SchemaFormEmitFn } from '../schema-form';
import { isArray, isFunction, isObject, isString } from '@/utils/is';
import { deepMerge } from '@/utils';

type UseFormActionContext = FormState &
  Pick<FormMethods, 'handleFormValues'> & {
    emit: SchemaFormEmitFn;
  };

type FormSchema = UnwrapFormSchema;

export type FormEvents = ReturnType<typeof useFormEvents>;

export function useFormEvents(formActionContext: UseFormActionContext) {
  const {
    emit,
    formPropsRef,
    formSchemasRef,
    formModel,
    cacheFormModel,
    getFormProps,
    schemaFormRef,
    defaultFormValues,
    originComponentPropsFnMap,
    handleFormValues,
  } = formActionContext;

  function getFieldsValue(): Recordable {
    const formEl = unref(schemaFormRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  /**
   * @description: Is it time
   */
  function itemIsDateType(key: string) {
    return unref(formPropsRef).schemas?.some((item) => {
      return item.field === key && isString(item.component)
        ? dateItemType.includes(item.component)
        : false;
    });
  }

  /**
   * @description: 设置表单字段值
   */
  async function setFieldsValue(values: Recordable) {
    const schemas = unref(formSchemasRef);
    // @ts-ignore
    const fields = schemas.map((item) => item.field).filter(Boolean);

    Object.assign(cacheFormModel, values);

    const validKeys: string[] = [];
    Object.entries(values).forEach(([key, value]) => {
      const schema = schemas.find((item) => item.field === key);

      const hasKey = Reflect.has(values, key);
      if (isString(schema?.component)) {
        value = handleInputNumberValue(schema?.component, value);
      }
      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(value)) {
            const arr: any[] = [];
            for (const ele of value) {
              arr.push(ele ? dayjs(ele) : null);
            }
            set(formModel, key, arr);
          } else {
            const { componentProps } = schema || {};
            let _props = componentProps as any;
            if (isFunction(componentProps)) {
              _props = _props({ formPropsRef, formModel });
            }
            set(formModel, key, value ? (_props?.valueFormat ? value : dayjs(value)) : null);
          }
        } else {
          set(formModel, key, value);
        }
        validKeys.push(key);
      }
    });
    // console.log('formModel', formModel);
    await validateFields(validKeys).catch((_) => {});
  }

  async function resetSchema(data: Partial<FormSchema> | Partial<FormSchema>[]) {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }
    unref(formPropsRef).schemas = updateData as FormSchema[];
  }

  /**
   * @description: 插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置
   */
  async function appendSchemaByField(schemaItem: FormSchema, prefixField?: string, first = false) {
    const schemaList = cloneDeep(unref(formSchemasRef));

    const index = schemaList.findIndex((schema) => schema.field === prefixField);

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schemaItem) : schemaList.push(schemaItem);
      formPropsRef.value.schemas = schemaList;
      return;
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schemaItem);
    }
    formPropsRef.value.schemas = schemaList;
    setDefaultValue(formPropsRef.value.schemas);
  }

  /**
   * @description: 根据 field 删除 Schema
   */
  async function removeSchemaByField(fields: string | string[]): Promise<void> {
    const schemaList = cloneDeep(unref(formSchemasRef));

    if (!fields) {
      return;
    }

    let fieldList: string[] = isString(fields) ? [fields] : fields;
    if (isString(fields)) {
      fieldList = [fields];
    }
    for (const field of fieldList) {
      if (isString(field)) {
        const index = schemaList.findIndex((schema) => schema.field === field);
        if (index !== -1) {
          unset(formModel, field);
          schemaList.splice(index, 1);
        }
      }
    }

    formPropsRef.value.schemas = schemaList;
  }

  /**
   * @description: 根据 field 查找 Schema
   */
  function getSchemaByFiled(fields: string | string[]): FormSchema | undefined {
    const schemaList = unref(formSchemasRef);
    const fieldList = ([] as string[]).concat(fields);
    return schemaList.find((schema) => fieldList.includes(schema.field));
  }

  /**
   * @description  更新formItemSchema
   */
  const updateSchema = (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
    let updateData: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }

    const hasField = updateData.every(
      (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field),
    );

    if (!hasField) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `field` field',
      );
      return;
    }
    const schemas: FormSchema[] = [];
    const updatedSchemas: FormSchema[] = [];

    unref(formSchemasRef).forEach((val) => {
      const updateItem = updateData.find((n) => val.field === n.field);
      if (updateItem) {
        const compProps = updateItem.componentProps;
        const newSchema = deepMerge(val, updateItem);

        if (originComponentPropsFnMap.has(val.field)) {
          const originCompPropsFn = originComponentPropsFnMap.get(val.field)!;

          newSchema.componentProps = (opt) => {
            return {
              ...originCompPropsFn(opt),
              ...(isFunction(compProps) ? compProps(opt) : compProps),
            };
          };
        }

        updatedSchemas.push(newSchema);
        schemas.push(newSchema);
      } else {
        schemas.push(val);
      }
    });

    setDefaultValue(updatedSchemas);
    formPropsRef.value.schemas = uniqBy<UnwrapFormSchema>(schemas, 'field');
  };

  function setDefaultValue(data: FormSchema | FormSchema[]) {
    let schemas: FormSchema[] = [];
    if (isObject(data)) {
      schemas.push(data as FormSchema);
    }
    if (isArray(data)) {
      schemas = [...data];
    }

    const obj: Recordable = {};
    const currentFieldsValue = getFieldsValue();
    schemas.forEach((item) => {
      if (
        item.component != 'Divider' &&
        Reflect.has(item, 'field') &&
        item.field &&
        !isNil(item.defaultValue) &&
        (!(item.field in currentFieldsValue) || isNil(currentFieldsValue[item.field]))
      ) {
        obj[item.field] = item.defaultValue;
      }
    });
    setFieldsValue(obj);
  }

  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getFormProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    Object.keys(formModel).forEach((key) => {
      set(formModel, key, defaultFormValues[key]);
    });

    emit('reset', formModel);
    submitOnReset && handleSubmit();
    setTimeout(clearValidate);
  }

  async function validateFields(nameList?: NamePath[] | undefined) {
    return schemaFormRef.value?.validateFields(nameList);
  }

  async function validate(nameList?: NamePath[] | undefined) {
    return await schemaFormRef.value!.validate(nameList);
  }

  async function clearValidate(name?: string | string[]) {
    await schemaFormRef.value?.clearValidate(name);
  }

  async function scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
    await schemaFormRef.value?.scrollToField(name, options);
  }

  async function handleSubmit(e?: Event) {
    e && e.preventDefault();
    const { submitFunc } = unref(getFormProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(schemaFormRef);
    if (!formEl) return;
    try {
      const values = await validate();
      const res = handleFormValues(values);
      emit('submit', values);
      return res;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  const handleEnterPress = (e: KeyboardEvent) => {
    const { autoSubmitOnEnter } = unref(formPropsRef);
    if (!autoSubmitOnEnter) return;
    if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
        handleSubmit(e);
      }
    }
  };

  return {
    submit: handleSubmit,
    handleEnterPress,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    updateSchema,
    resetSchema,
    getSchemaByFiled,
    appendSchemaByField,
    removeSchemaByField,
    resetFields,
    setFieldsValue,
    scrollToField,
    setDefaultValue,
  };
}
