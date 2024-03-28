import { computed, reactive, ref, unref, watch } from 'vue';
import { cloneDeep, set } from 'lodash-es';
import type { SetupContext, DefineComponent } from 'vue';
import type { AdvanceState } from '../types/hooks';
import type { SchemaFormProps } from '../schema-form';
import type { FormInstance } from 'ant-design-vue';
import type { ComponentProps, RenderCallbackParams } from '../types';
import { isFunction } from '@/utils/is';

export type FormState = ReturnType<typeof useFormState>;

export type useFormStateParams = {
  props: SchemaFormProps;
  attrs: SetupContext['attrs'];
};

export const useFormState = ({ props, attrs }: useFormStateParams) => {
  /** // TODO 将formSchema克隆一份，避免修改原有的formSchema */
  const formPropsRef = ref<SchemaFormProps>(cloneDeep(props));
  /** 表单项数据 */
  const formModel = reactive({ ...props.initialValues });
  /** 表单默认数据 */
  const defaultFormValues = reactive({ ...props.initialValues });
  /** 表单实例 */
  const schemaFormRef = ref<FormInstance>();
  /** 缓存的表单值，用于恢复form-item v-if为true后的值 */
  const cacheFormModel = { ...props.initialValues };
  /** 将所有的表单组件实例保存起来 */
  const compRefMap = new Map<string, DefineComponent<any>>();
  /** 初始时的componentProps，用于updateSchema更新时不覆盖componentProps为函数时的值 */
  const originComponentPropsFnMap = new Map<
    string,
    (opt: RenderCallbackParams) => ComponentProps
  >();

  const advanceState = reactive<AdvanceState>({
    isAdvanced: true,
    hideAdvanceBtn: false,
    isLoad: false,
    actionSpan: 6,
  });

  // 获取表单所有属性
  const getFormProps = computed(() => {
    return {
      ...attrs,
      ...formPropsRef.value,
    } as SchemaFormProps;
  });

  // 获取栅栏Row配置
  const getRowConfig = computed((): Recordable => {
    const { baseRowStyle = {}, rowProps } = unref(getFormProps);
    return {
      style: baseRowStyle,
      ...rowProps,
    };
  });

  const getFormActionBindProps = computed(
    (): Recordable => ({ ...getFormProps.value, ...advanceState }),
  );

  watch(
    () => formPropsRef.value.schemas,
    () => {
      formPropsRef.value.schemas?.forEach((item) => {
        if (!originComponentPropsFnMap.has(item.field) && isFunction(item.componentProps)) {
          originComponentPropsFnMap.set(item.field, item.componentProps);
        }
        set(defaultFormValues, item.field, item.defaultValue);
      });
    },
  );

  return {
    formModel,
    defaultFormValues,
    schemaFormRef,
    formPropsRef,
    cacheFormModel,
    compRefMap,
    getFormProps,
    advanceState,
    getRowConfig,
    getFormActionBindProps,
    originComponentPropsFnMap,
    formSchemasRef: computed(() => unref(formPropsRef).schemas || []),
  };
};
