import type { PropType, ExtractPropTypes } from 'vue';
import { tableProps } from 'ant-design-vue/lib/table';
import type { FormProps } from 'ant-design-vue';
import type { LoadDataParams, TableColumn, OnChangeCallbackParams } from './typing';

export const props = {
  ...tableProps(),
  /** 表单属性配置 */
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  columns: {
    type: Array as PropType<TableColumn<any>[]>,
    required: true,
    default: () => [],
  },
  dataRequest: {
    // 获取列表数据函数API
    type: Function as PropType<
      (
        params?: LoadDataParams,
        onChangeParams?: OnChangeCallbackParams,
      ) => Promise<API.TableListResult>
    >,
  },
  /** 是否显示索引号 */
  showIndex: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 索引列属性配置 */
  indexColumnProps: {
    type: Object as PropType<Partial<TableColumn>>,
    default: () => ({}),
  },
  /** 是否显示表格工具栏 */
  showToolBar: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否显示表格设置 */
  showTableSetting: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 表格标题 */
  headerTitle: String as PropType<string>,
  /** 表格标题提示信息 */
  titleTooltip: String as PropType<string>,
  /** 是否显示搜索表单 */
  search: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
};

export type TableProps = ExtractPropTypes<typeof props>;

export default props;
