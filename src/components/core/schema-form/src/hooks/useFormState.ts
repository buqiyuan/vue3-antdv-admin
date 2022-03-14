import { computed, reactive, ref, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import type { SetupContext } from 'vue';
import type { AdvanceState } from '../types/hooks';
import type { SchemaFormProps } from '../schema-form';
import type { FormInstance } from 'ant-design-vue';

export type FormState = ReturnType<typeof useFormState>;

export type useFormStateParams = {
  props: SchemaFormProps;
  attrs: SetupContext['attrs'];
};

export const useFormState = ({ props, attrs }: useFormStateParams) => {
  // TODO 将formSchema克隆一份，避免修改原有的formSchema
  const formPropsRef = ref<SchemaFormProps>(cloneDeep(props));
  /** 表单项数据 */
  const formModel = reactive({ ...props.initialValues });
  // 表单默认数据
  const defaultFormValues = reactive({ ...props.initialValues });
  // 表单实例
  const schemaFormRef = ref<FormInstance>();
  // 缓存的表单值，用于恢复form-item v-if为true后的值
  const cacheFormModel = { ...props.initialValues };
  // 将所有的表单组件实例保存起来
  const compRefs = {} as any;

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

  return {
    formModel,
    defaultFormValues,
    schemaFormRef,
    formPropsRef,
    cacheFormModel,
    compRefs,
    getFormProps,
    advanceState,
    getRowConfig,
    getFormActionBindProps,
    formSchemasRef: computed(() => unref(formPropsRef).schemas || []),
  };
};
