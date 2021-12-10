<template>
  <div>
    <a-alert
      message="简单封装ant-design-vue的表格"
      description="设置属性 show-summary 为 true 会在表格尾部展示合计行。
        默认第一列不进行计算，而是显示 合计，设置属性 sum-text 可以自定义文字。
        属性 summary-func 可以自定义合计行每列显示的内容"
      type="info"
      show-icon
    />
    <a-card title="使用show-summary自定义合计规则" style="margin-top: 20px">
      <dynamic-table
        :show-summary="true"
        size="small"
        :scroll="{ x: 1500, y: 300 }"
        :data-source="dataSource"
        :columns="columns"
        rowKey="id"
      />
    </a-card>

    <a-card title="使用summary-func自定义合计规则" style="margin-top: 20px">
      <dynamic-table
        :show-summary="true"
        :summary-func="summaryFunc"
        size="small"
        :scroll="{ x: 1500, y: 300 }"
        :data-source="dataSource"
        :columns="columns"
        rowKey="id"
      />
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Alert, Card } from 'ant-design-vue';
  import { DynamicTable } from '@/components/dynamic-table';
  import mockData from './mockData.json';
  import { columns } from './columns';

  /**
   * @description 合计表格功能
   */
  export default defineComponent({
    name: 'CustomModal',
    components: { [Alert.name]: Alert, [Card.name]: Card, DynamicTable },
    setup() {
      /**
       * 自定义合计的计算规则
       */
      const summaryFunc = ({ dataSource = [], columns = [] }): string[] => {
        const keys = Object.keys(dataSource[0]);
        const sums = keys.reduce((prev, key) => {
          const count = dataSource.map((n) => n[key]).reduce((p, c) => c + p, 0);
          prev[key] = isNaN(Number(count)) ? '' : `${count}元`;
          return prev;
        }, {});
        return columns.reduce((prev, curr: any, index) => {
          if (index === 0) {
            prev.push('总价');
          } else {
            prev.push(sums[curr.dataIndex]);
          }
          return prev;
        }, [] as string[]);
      };

      return {
        summaryFunc,
        dataSource: mockData,
        columns: columns.map((n) => ({ width: 120, ...n })),
      };
    },
  });
</script>

<style lang="less" scoped></style>
