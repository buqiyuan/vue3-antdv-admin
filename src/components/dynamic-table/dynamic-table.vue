<template>
  <a-table
      :columns="columns"
      :loading="loading"
      :rowSelection="rowSelection"
      :rowKey="rowKey"
      size="middle"
      :data-source="data"
      :pagination="pageOption"
      @change="paginationChange"
      bordered
      v-bind="{...$props, ...$attrs}"
  >
    <!--  自定义slots start-->
    <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>

    <!--    自定义slots end-->

    <!--    是否有自定义显示slots start-->
    <template v-for="slotItem in columns.filter(item => item.slots)"
              :key="slotItem.dataIndex || slotItem.slots.customRender"
              v-slot:[slotItem.slots.customRender]="slotProps">

      <!--        自定义渲染start-->
      <slot v-if="$slots[slotItem.slots.customRender]" :name="slotItem.slots.customRender" v-bind="slotProps"></slot>
      <!--        自定义渲染end-->

      <!--     非自定义渲染start -->
      <template v-else>
        <!--        非操作 start-->
        <template v-if="slotItem.slots.customRender !== 'action'">
          <!--        使用自定义组件格式化显示start-->
          <template v-if="slotItem.slotsType == 'component'">
            <component :is="slotItem.slotsFunc(slotProps.record)"/>
          </template>
          <!--        使用自定义组件格式化显示end-->
          <!--        使用自定义函数格式化显示-->
          <template v-if="slotItem.slotsType == 'format'">
            {{ slotItem.slotsFunc(slotProps.record[slotItem.dataIndex || slotItem.key], slotProps.record) }}
          </template>
          <!--        链接用于跳转-->
          <template v-if="slotItem.slotsType == 'link'">
            <router-link :to="slotItem.linkPath + slotProps.record[slotItem.linkId]">{{ slotProps.text }}</router-link>
          </template>
        </template>
        <!--      非操作 end-->

        <!--        操作start-->
        <div v-if="slotItem.slots.customRender == 'action'" :key="slotItem.slots.customRender" class="actions">
          <!--        对表格的操作动作start-->
          <template v-for="(action, index) in actions">
            <template v-if="action.type == 'select'">
              <!--              下拉选择器-->
              <a-select
                  v-model:value="slotProps.record[action.key]"
                  :key="index"
                  size="small"
              >
                <Option v-for="option in action.options" :value="option.value" :key="option.value">
                  {{ option.label }}
                </Option>
              </a-select>
            </template>
            <!--            编辑按钮-->
            <template v-if="action.type ==  'button'">
              <a-button v-permission="action.permission"
                        v-bind="{...buttonProps,...action.props}" @click="actionEvent(slotProps.record, action.func)"
                        :key="index">
                {{ action.text }}
              </a-button>
            </template>
            <!--            删除按钮 气泡确认框-->
            <template v-if="action.type == 'popconfirm'">
              <a-popconfirm :key="index" placement="leftTop" @confirm="actionEvent(slotProps.record, action.func, 'del')">
                <template v-slot:title>
                  您确定要删除吗？
                </template>
                <a-button v-bind="{...buttonProps,...action.props}">
                  {{ action.text }}
                </a-button>
              </a-popconfirm>
            </template>
          </template>
          <!--        对表格的操作动作end-->
        </div>
        <!--      操作end-->
      </template>
      <!--      非自定义渲染end-->
    </template>
    <!--    是否有自定义显示slots end-->
  </a-table>
</template>

<script lang="ts">
import {defineComponent, reactive, PropType, toRefs} from 'vue'
import {Card, Select, Table, Popconfirm, message} from 'ant-design-vue'
import {ColumnProps, TableProps} from 'ant-design-vue/lib/table/interface'
import {PaginationProps} from 'ant-design-vue/lib/pagination/Pagination'
import {usePages} from "@/hooks";
import useDragCol from './utils/useDragCol'

interface Columns extends ColumnProps{
  actions?: any;
  dataIndex: string;
}

type pageOption = Partial<typeof PaginationProps>

interface Props extends Omit<TableProps, 'columns'>{
  columns: Columns[];
  rowKey: string | ((record: any) => string);
  pageOption: pageOption;
  getListFunc: (prams) => any;
}

export default defineComponent({
  name: 'dynamic-table',
  props: {
    columns: {
      type: Object as PropType<Columns[]>
    },
    getListFunc: { // 获取列表数据函数API
      type: Function
    },
    rowSelection: {
      type: Object
    },
    rowKey: { // 表格唯一字段
      type: [String, Function] as PropType<string | ((record: any) => string)>,
    },
    pageOption: { // 分页参数
      type: Object as PropType<pageOption>,
      default: () => ({})
    }
  },
  components: {
    [Table.name]: Table,
    [Card.name]: Card,
    [Select.name]: Select,
    [Popconfirm.name]: Popconfirm,
    [Select.Option.name]: Select.Option
  },
  setup(props: Props, {attrs, emit, slots}) {
    const {pageOption} = usePages()

    // 开启表格伸缩列
    useDragCol(props.columns)

    const state = reactive({
      expandItemRefs: {},
      data: [], // 表格数据
      pageOption: Object.assign(pageOption, props.pageOption), // 表格分页
      actions: props.columns.find(item => (item.dataIndex || item.key) == 'action')?.actions || [], // 表格操作（如：编辑、删除的按钮等）
      loading: false, // 表格加载
    })

    // 获取表格数据
    const refreshTableData = async (params = {}) => {
      params = {
        pageNumber: state.pageOption.current,
        pageSize: state.pageOption.pageSize,
        ...props.pageOption,
        ...params
      }
      state.loading = true
      const {data, pageNumber, pageSize, total} = await props.getListFunc(params).finally(() => state.loading = false)
      Object.assign(state.pageOption, {current: ~~pageNumber, pageSize: ~~pageSize, total: ~~total})
      state.data = data
    }

    refreshTableData()

    // 操作事件
    const actionEvent = async (record, func, actionType) => {
      // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
      await func({record, props}, () => setTimeout(() => refreshTableData()))
      // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
      if (actionType == 'del' && state.data.length < 2) {
        state.pageOption.current = Math.max(1, state.pageOption.current - 1)
      }
    }

    // 分页改变
    const paginationChange = (pagination, filters, sorter) => {
      const {field, order} = sorter
      console.log(pagination)
      state.pageOption = {
        ...state.pageOption,
        ...pagination
      }
      refreshTableData({
        pageSize: pagination.pageSize,
        pageNumber: pagination.current, ...props.pageOption, ...filters,
        field,
        order
      })
    }

    // dataIndex 可以为 a.b.c
    // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

    const buttonProps = {
      size: 'small'
    }

    return {
      ...toRefs(state),
      buttonProps,
      actionEvent,
      refreshTableData,
      paginationChange,
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.ant-table .ant-table-title) {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}

.actions > * {
  margin-right: 10px;
}
</style>
