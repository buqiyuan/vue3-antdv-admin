<template>
  <a-table
      v-bind="$props"
      :columns="columns"
      :loading="tableLoading"
      :rowSelection="rowSelection"
      :rowKey="rowKey"
      size="middle"
      :data-source="data"
      :pagination="pageOption"
      @change="paginationChange"
  >
    <!--  自定义slots start-->
    <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
        <slot :name="key" v-bind="slotProps"></slot>
    </template>
    <!--    自定义slots end-->

    <!--    是否有自定义显示slots start-->
    <template v-for="slotItem in columns.filter(item => item.slots)"
              v-slot:[slotItem.slots.customRender]="slotProps">

      <!--        自定义渲染start-->
      <slot v-if="$slots[slotItem.slots.customRender]" :name="slotItem.slots.customRender" v-bind="slotProps"></slot>
      <!--        自定义渲染end-->

      <!--     非自定义渲染start -->
      <template v-else>
        <!--        非操作 start-->
        <div v-if="slotItem.slots.customRender !== 'action'" :key="slotItem.slots.customRender">
          <!--        使用自定义组件格式化显示-->
          <template v-if="slotItem.slotsType == 'component'">
            <component :is="slotItem.slotsFunc(slotProps.record)" />
          </template>
          <!--        使用自定义组件格式化显示-->
          <template v-if="slotItem.slotsType == 'format'">
            {{ slotItem.slotsFunc(slotProps.record[slotItem.dataIndex || slotItem.key], slotProps.record) }}
          </template>
          <!--        链接用于跳转-->
          <template v-if="slotItem.slotsType == 'link'">
            <router-link :to="slotItem.linkPath + slotProps.record[slotItem.linkId]">{{ slotProps.text }}</router-link>
          </template>
        </div>
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
            <!--            按钮-->
            <template v-if="action.type ==  'button'">
              <a-button v-permission="action.permission"
                        v-bind="{...buttonProps,...action.props}" @click="actionEvent(slotProps.record, action.func)"
                        :key="index">
                {{ action.text }}
              </a-button>
            </template>
            <!--            跳转链接-->
            <template v-if="action.type ==  'link'">
              <router-link :to="`/`" :key="index" @click="saveChange(slotProps.record)">详情</router-link>
            </template>
            <!--            气泡确认框-->
            <template v-if="action.type == 'popconfirm'">
              <a-popconfirm :key="index" placement="leftTop" @confirm="actionEvent(slotProps.record, action.func)">
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
import {TableProps} from 'ant-design-vue/lib/table/interface'
import {usePages} from "@/hooks";

interface Columns {
  actions?: any;

  [key: string]: any;
}

interface Props {
  columns: Columns[];
  rowSelection: any;
  rowKey: string | number;
  pageOption: object;
  getListFunc: (prams) => any;
}

// 分页查询参数
interface PagePrams {
  limit?: string | number;
  page?: string | number;

  [key: string]: any;
}

export default defineComponent({
  name: 'dynamic-table',
  props: {
    columns: {
      type: Object as PropType<object[]>
    },
    getListFunc: {
      type: Function
    },
    rowSelection: {
      type: Object
    },
    rowKey: {
      type: [String, Number] as PropType<string | number>
    },
    pageOption: {
      type: Object
    }
  },
  components: {
    [Table.name]: Table,
    [Card.name]: Card,
    [Select.name]: Select,
    [Popconfirm.name]: Popconfirm,
    [Select.Option.name]: Select.Option
  },
  setup(props: Props, {attrs, slots}) {
    const {pageOption} = usePages()

    const state = reactive({
      data: [], // 表格数据
      pageOption: Object.assign(pageOption, props.pageOption), // 表格分页
      actions: props.columns.find(item => (item.dataIndex || item.key) == 'action')?.actions || [], // 表格操作（如：编辑、删除的按钮等）
      tableLoading: false, // 表格加载
    })

    // 获取表格数据
    const refreshTableData = async (params = {}) => {
      params = {
        page: state.pageOption.current,
        limit: state.pageOption.pageSize,
        ...props.pageOption,
        ...params
      }
      state.tableLoading = true
      const {data, pageNumber,pageSize, total} = await props.getListFunc(params).finally(() => state.tableLoading = false)
      Object.assign(state.pageOption, {current: ~~pageNumber,pageSize: ~~pageSize, total: ~~total})
      state.data = data
    }

    refreshTableData()

    // 操作事件
    const actionEvent = (record, func) => func({record, props}, refreshTableData)

    // 分页改变
    const paginationChange = (pagination) => {
      console.log(pagination)
      state.pageOption = {
        ...state.pageOption,
        ...pagination
      }
      refreshTableData({limit: pagination.pageSize, pageNumber: pagination.current, ...props.pageOption})
    }

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
  border-top: 0;

  .ant-btn {
    margin-right: 10px;
  }
}

.actions > * {
  margin-right: 10px;
}
</style>
