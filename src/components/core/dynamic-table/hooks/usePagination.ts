import { ref } from 'vue';
// import Pagination from 'ant-design-vue/lib/pagination/Pagination'
import type { TableProps } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

export type Pagination = TableProps['pagination'];

export function usePagination(pageOption: Pagination) {
  const { t } = useI18n();
  // 分页配置参数
  const paginationRef = ref<Pagination>(false);

  if (!Object.is(pageOption, false)) {
    paginationRef.value = {
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '20', '50', '100'],
      showQuickJumper: true,
      showSizeChanger: true, // 显示可改变每页数量
      showTotal: (total) => t('component.table.total', { total }), // 显示总数
      // onChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      // onShowSizeChange: (current, pageSize) => pageOption?.pageChange?.(current, pageSize),
      ...pageOption,
    };
  }

  // 提供给ant-pagination组件的参数
  // const state = reactive({
  //     pageOption
  // })

  // 更新分页配置
  // const updatePageOption = (options = {}) => {
  //   Object.assign(pageOptions.value, options);
  //   // Object.keys(options).forEach(key => pageOption.value[key] = options[key])
  //   console.log(pageOptions.value, '更新分页配置');
  // };

  return {
    paginationRef,
  };
}
