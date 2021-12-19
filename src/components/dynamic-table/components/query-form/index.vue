<template>
  <div class="table-search">
    <schema-form ref="dynamicFormRef" :form-schema="formSchema">
      <template #operate-button>
        <span class="search-submitButtons" :style="{ float: 'right', overflow: 'hidden' }">
          <span>
            <a-button type="default" style="margin-right: 10px" @click="reset"> 重置 </a-button>
            <a-button type="primary" @click="query"> 查询 </a-button>
          </span>
          <template v-if="formItemSchemas.length > 0 && formItemSchemas.length > defaultShowItems">
            <a style="margin-left: 8px" @click="toggleAdvanced">
              {{ advanced ? '收起' : '展开' }}
              <DownOutlined class="collapse-icon" />
            </a>
          </template>
        </span>
      </template>
    </schema-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed, ref } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import type { TableColumn } from '../../typing';
  import SchemaForm from '@/components/JSON-schema-form/schema-form.vue';
  import type { FormItemSchema, FormProps } from '@/components/JSON-schema-form/types/form';

  export default defineComponent({
    name: 'QueryForm',
    components: { DownOutlined, SchemaForm },
    props: {
      /** 默认显示个数 */
      defaultShowItems: {
        type: Number,
        default: 3,
      },
      /** 表单属性配置 */
      formProps: {
        type: Object as PropType<FormProps>,
        default: () => ({}),
      },
      columns: {
        type: Object as PropType<TableColumn[]>,
        required: true,
      },
    },
    emits: ['query', 'reset'],
    setup(props, { slots, emit }) {
      const state = reactive({
        advanced: false,
        labelMap: {},
      });

      const dynamicFormRef = ref<InstanceType<typeof SchemaForm>>();

      // 获取表格列key
      const getColumnKey = (column: TableColumn) => {
        return `${column.key || column.dataIndex || ''}`.split('.').pop() || '';
      };

      /**
       * @description 展开/收起 图标旋转转数
       */
      const turn = computed(() => `${state.advanced ? 0.5 : 0}turn`);

      const formSchema = computed(() => {
        return {
          schemas: !state.advanced
            ? formItemSchemas.value.slice(0, props.defaultShowItems)
            : formItemSchemas.value,
          labelWidth: 80,
          ...props.formProps,
        };
      });

      const formItemSchemas = computed<FormItemSchema[]>(() => {
        return props.columns
          .filter((n) => {
            const field = getColumnKey(n);
            return !n.hideInSearch && !!field && field !== '$action';
          })
          .map((n) => {
            return {
              field: n.formItemProps?.field ?? n.searchField ?? getColumnKey(n),
              component: 'Input',
              label: n.title,
              colProps: {
                span: 8,
              },
              ...n.formItemProps,
            };
          });
      });

      /**
       * @description 切换展开/收起 状态
       */
      const toggleAdvanced = () => {
        state.advanced = !state.advanced;
      };

      /**
       * @param {number} span 栅格占位格数
       */
      const calcSubBtnOffset = (span: number) => {
        const total = (state.advanced ? Object.keys(slots).length : props.defaultShowItems) * span;
        const remainder = total % 24;
        if (total < 24 || remainder === 0) {
          return 0;
        }
        return 24 - remainder;
      };

      const reset = async () => {
        dynamicFormRef.value?.resetFields();
        await query();
      };
      const query = async () => {
        const formModel = await dynamicFormRef.value?.validate();
        console.log('queryParams', formModel);

        emit('query', formModel);
      };

      return {
        ...toRefs(state),
        dynamicFormRef,
        turn,
        reset,
        query,
        calcSubBtnOffset,
        formSchema,
        formItemSchemas,
        toggleAdvanced,
      };
    },
  });
</script>

<style lang="less" scoped>
  .table-search {
    margin-bottom: 16px;
    padding: 24px 24px 0;
    background: #fff;
  }
  .search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }

  :deep(.ant-row) {
    width: 100%;
  }

  :deep(.ant-form-item) {
    margin-right: 0;
    &.operate-button {
      margin-bottom: 0;
    }
  }

  .collapse-icon {
    transform: rotate(v-bind(turn));
    transition: transform 0.3s;
  }
</style>
