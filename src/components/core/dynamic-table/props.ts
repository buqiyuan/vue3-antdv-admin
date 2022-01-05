import type { PropType, ExtractPropTypes } from 'vue';
import { tableProps } from 'ant-design-vue/lib/table';
import type { FormProps } from 'ant-design-vue';
import type { BookType } from 'xlsx';
import type { LoadDataParams, TableColumn, OnChangeCallbackParams } from './typing';

export const props = {
  ...tableProps(),
  /** 表单属性配置 */
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  /** 表格列配置 */
  columns: {
    type: Array as PropType<TableColumn<any>[]>,
    required: true,
    default: () => [],
  },
  /** 表格数据请求函数 */
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
  // excel导出配置
  /** 导出的文件名 */
  exportFileName: {
    type: String as PropType<string>,
  },
  /** xlsx的booktype */
  exportBookType: {
    type: String as PropType<BookType>,
    default: 'xlsx',
  },
  /** 自动宽度 */
  exportAutoWidth: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 自定义数据导出格式函数 */
  exportFormatter: {
    type: Function as PropType<
      (columns: TableColumn<any>[], tableData: any[]) => { header: Recordable; data: any[] }
    >,
    default: null,
  },
};

export type TableProps = ExtractPropTypes<typeof props>;

export default props;
