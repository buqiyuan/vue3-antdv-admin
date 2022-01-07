<template>
  <Form ref="schemaFormRef" v-bind="getFormProps" :model="formModel">
    <Row v-bind="getRowConfig">
      <template v-for="schemaItem in formSchemaRef.schemas" :key="schemaItem.field">
        <SchemaFormItem
          v-if="getFormItemIsShow(schemaItem, 'vIf')"
          v-show="getFormItemIsShow(schemaItem, 'vShow')"
          :schema-item="schemaItem"
          :schema="formSchemaRef"
          :set-form-model="setFormModel"
          :form-model="formModel"
          :setItemRef="setItemRef(schemaItem)"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </SchemaFormItem>
      </template>
      <template v-if="$slots['operate-button']">
        <FormItem class="operate-button">
          <slot name="operate-button"></slot>
        </FormItem>
      </template>
    </Row>
  </Form>
</template>

<script lang="ts">
  import {
    reactive,
    ref,
    PropType,
    unref,
    defineComponent,
    computed,
    watchEffect,
    getCurrentInstance,
  } from 'vue';
  import { Form, Row } from 'ant-design-vue';
  import { formProps } from 'ant-design-vue/lib/form';
  import { isNullOrUnDef, isObject, isArray, isFunction, isBoolean, isString } from '@/utils/is';
  import { deepMerge } from '@/utils/';
  import SchemaFormItem from './schema-form-item.vue';
  import type { FormItemSchema, FormSchema, FormActionType } from './types/form';
  import { NamePath } from 'ant-design-vue/lib/form/interface';
  import { uniqBy, cloneDeep } from 'lodash-es';
  import { dateItemType, handleInputNumberValue } from './helper';
  import dayjs from 'dayjs';
  import { createFormContext } from './hooks/useFormContext';

  export default defineComponent({
    name: 'SchemaForm',
    components: { Form, Row, SchemaFormItem, FormItem: Form.Item },
    props: {
      ...formProps,
      formSchema: {
        // 动态验证表单
        type: Object as PropType<FormSchema>,
        default: () => ({}),
      },
      initialValues: {
        // 预置字段默认值
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
    },
    emits: ['submit', 'reset'],
    setup(props, { attrs, emit }) {
      // provide schemaForm instance
      createFormContext(getCurrentInstance()!);
      let oldFormSchema: FormSchema;
      // TODO 将formSchema克隆一份，避免修改原有的formSchema
      // TODO 类型为FormSchema 提示：类型实例化过深，且可能无限
      const formSchemaRef = ref<FormSchema>(cloneDeep(props.formSchema));
      // 表单项数据
      const formModel = reactive({ ...props.initialValues });
      // 表单默认数据
      const defaultFormValues = reactive({ ...props.initialValues });
      // 表单实例
      const schemaFormRef = ref<FormActionType>();
      // 表单属性
      const schemaFormPropsRef = ref<Partial<FormSchema>>({});
      // 缓存的表单值，用于恢复form-item v-if为true后的值
      const cacheFormModel = { ...props.initialValues };
      // 将所有的表单组件实例保存起来
      const compRefs = {} as any;

      // 获取表单所有属性
      const getFormProps = computed(() => {
        return {
          ...attrs,
          ...props,
          ...schemaFormPropsRef.value,
        } as FormSchema;
      });

      watchEffect(() => {
        if (Object.is(props.formSchema, oldFormSchema)) {
          // console.log('相同');
          deepMerge(formSchemaRef.value, cloneDeep(props.formSchema));
        } else {
          // console.log('不相同');
          formSchemaRef.value = cloneDeep(props.formSchema);
        }
        oldFormSchema = props.formSchema;
      });

      // 初始化数据
      unref(formSchemaRef).schemas?.forEach((item) => {
        const { defaultValue } = item;
        if (!isNullOrUnDef(defaultValue)) {
          formModel[item.field] = defaultValue;
          defaultFormValues[item.field] = defaultValue;
          cacheFormModel[item.field] = defaultValue;
        }
      });
      // 将所有的表单组件实例保存起来
      const setItemRef = (formItem: FormItemSchema) => {
        return (el) => {
          if (el) {
            compRefs[formItem.field] = el;
          }
        };
      };

      const getFormItemIsShow = (formItem: FormItemSchema, key: 'vIf' | 'vShow') => {
        if (Reflect.has(formItem, key)) {
          const isShow = formItem[key];
          let show = true;
          if (isBoolean(isShow)) {
            show = isShow;
          }
          if (isFunction(isShow)) {
            show = isShow({ schemaItem: formItem, formModel, field: formItem.field });
          }
          if (Object.is(show, false) && key === 'vIf') {
            formModel[formItem.field] = undefined;
          } else if (Object.is(show, true) && key === 'vIf') {
            formModel[formItem.field] = cacheFormModel[formItem.field];
          }
          return show;
        } else {
          return true;
        }
      };

      // 设置表单属性
      const setFormProps = (formProps: Partial<FormSchema>) => {
        Object.assign(schemaFormPropsRef.value, formProps);
      };

      // 设置某个字段的值
      const setFormModel = (key: string, value: any) => {
        formModel[key] = value;
        cacheFormModel[key] = value;
        const { validateTrigger } = unref(getFormProps);
        if (!validateTrigger || validateTrigger === 'change') {
          schemaFormRef.value?.validateFields([key]).catch((_) => {});
        }
      };
      // 获取栅栏Row配置
      const getRowConfig = computed((): Recordable => {
        const { baseRowStyle = {}, rowProps } = unref(getFormProps);
        return {
          style: baseRowStyle,
          ...rowProps,
        };
      });

      /**
       * @description: Is it time
       */
      function itemIsDateType(key: string) {
        return unref(formSchemaRef).schemas.some((item) => {
          return item.field === key && isString(item.component)
            ? dateItemType.includes(item.component)
            : false;
        });
      }

      /**
       * @description: Set form value
       */
      async function setFieldsValue(values: Recordable): Promise<void> {
        const schemas = unref(formSchemaRef).schemas;
        const fields = schemas.map((item) => item.field).filter(Boolean);

        Object.assign(cacheFormModel, values);

        const validKeys: string[] = [];
        Object.keys(values).forEach((key) => {
          const schema = schemas.find((item) => item.field === key);
          let value = values[key];

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
                formModel[key] = arr;
              } else {
                const { componentProps } = schema || {};
                let _props = componentProps as any;
                if (typeof componentProps === 'function') {
                  _props = _props({ formModel });
                }
                formModel[key] = value ? (_props?.valueFormat ? value : dayjs(value)) : null;
              }
            } else {
              formModel[key] = value;
            }
            validKeys.push(key);
          }
        });
        validateFields(validKeys).catch((_) => {});
      }

      async function resetSchema(data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) {
        let updateData: Partial<FormItemSchema>[] = [];
        if (isObject(data)) {
          updateData.push(data as FormItemSchema);
        }
        if (isArray(data)) {
          updateData = [...data];
        }
        // @ts-ignore
        unref(formSchemaRef).schemas = updateData as FormItemSchema[];
      }

      /**
       * @description  更新formItemSchema
       */
      async function updateSchema(data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) {
        let updateData: Partial<FormItemSchema>[] = [];
        if (isObject(data)) {
          updateData.push(data as FormItemSchema);
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
        const schema: FormItemSchema[] = [];
        updateData.forEach((item) => {
          unref(formSchemaRef).schemas.forEach((val) => {
            if (val.field === item.field) {
              const newSchema = deepMerge(val, item);
              schema.push(newSchema);
            } else {
              schema.push(val);
            }
          });
        });
        unref(formSchemaRef).schemas = uniqBy(schema, 'field');
      }

      async function resetFields(): Promise<void> {
        const { resetFunc, submitOnReset } = unref(getFormProps);
        resetFunc && isFunction(resetFunc) && (await resetFunc());

        Object.keys(formModel).forEach((key) => {
          formModel[key] = defaultFormValues[key];
        });

        emit('reset', formModel);
        submitOnReset && handleSubmit();
        setTimeout(clearValidate);
      }

      async function validateFields(nameList?: NamePath[] | undefined) {
        return schemaFormRef.value?.validateFields(nameList);
      }

      async function validate(nameList?: NamePath[] | undefined) {
        await schemaFormRef.value?.validate(nameList);
        return formModel;
      }

      async function clearValidate(name?: string | string[]) {
        await schemaFormRef.value?.clearValidate(name);
      }

      async function scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
        await schemaFormRef.value?.scrollToField(name, options);
      }

      const handleSubmit = () => {
        emit('submit');
      };

      return {
        schemaFormRef,
        schemaFormPropsRef,
        getFormProps,
        formModel,
        formSchemaRef,
        getRowConfig,
        compRefs,
        setItemRef,
        getFormItemIsShow,
        resetFields,
        setFieldsValue,
        setFormProps,
        setFormModel,
        validateFields,
        resetSchema,
        updateSchema,
        validate,
        clearValidate,
        scrollToField,
      };
    },
  });
</script>
