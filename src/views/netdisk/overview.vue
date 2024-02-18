<template>
  <div class="netdisk-overview-container">
    <div class="ov-header">
      <OverviewHeaderItem title="存储总量" :value="spaceSize" :suffix="spaceUnit" />
      <OverviewHeaderItem title="文件数量" :value="fileSize" suffix="个" />
      <OverviewHeaderItem title="下载流量" :value="flowSize" :suffix="flowUnit" />
      <OverviewHeaderItem title="GET请求次数" :value="hitSize" suffix="次" />
    </div>
    <div class="ov-content">
      <Card shadow="hover">
        <Tabs v-model="actionTabName" destroy-inactive-tab-pane>
          <Tabs.TabPane key="flow" tab="流量趋势">
            <v-chart :option="flowChartOption" style="height: 320px" autoresize />
          </Tabs.TabPane>
          <Tabs.TabPane key="space" tab="容量趋势">
            <VChart :option="spaceChartOption" style="height: 320px" autoresize />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent, GridComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { LineChart } from 'echarts/charts';
  import { Card, Tabs } from 'ant-design-vue';
  import OverviewHeaderItem from './components/overview-header-item.vue';
  import type { TitleComponentOption, TooltipComponentOption } from 'echarts/components';
  import type {
    ComposeOption,
    LineSeriesOption,
    XAXisOption,
    YAXisOption,
  } from 'echarts/types/dist/shared.js';
  import { Api } from '@/api/';
  import { formatSizeUnits } from '@/utils';

  type ECOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | XAXisOption | YAXisOption | LineSeriesOption
  >;

  defineOptions({
    name: 'NetDiskOverview',
  });

  use([CanvasRenderer, TooltipComponent, GridComponent, LineChart]);

  const loading = ref(false);
  // header
  const spaceSize = ref(0);
  const spaceUnit = ref('B');
  const fileSize = ref(0);
  const flowSize = ref(0);
  const flowUnit = ref('B');
  const hitSize = ref(0);
  // content
  const actionTabName = ref('flow');
  const flowChartOption = ref<ECOption>({
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        return `<div>${params[0].name}号</div><div>${params[0].marker} ${params[0].seriesName}：${params[0].value}MB</div>`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}MB' },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      show: false,
      top: '5%',
      right: '2%',
      left: '5%',
      bottom: '8%',
    },
    series: [
      {
        name: '使用流量',
        data: [],
        type: 'line',
        smooth: 0.6,
        areaStyle: {
          color: '#8cc6f2',
        },
        itemStyle: {
          opacity: 0,
        },
        lineStyle: {
          color: '#8cc6f2',
        },
      },
    ],
  });
  const spaceChartOption = ref<ECOption>({
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        return `<div>${params[0].name}号</div><div>${params[0].marker} ${params[0].seriesName}：${params[0].value}MB</div>`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}MB' },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      show: false,
      top: '5%',
      right: '2%',
      left: '5%',
      bottom: '8%',
    },
    series: [
      {
        name: '占用空间',
        data: [],
        type: 'line',
        smooth: 0.6,
        areaStyle: {
          color: '#8cc6f2',
        },
        itemStyle: {
          opacity: 0,
        },
        lineStyle: {
          color: '#8cc6f2',
        },
      },
    ],
  });

  const initData = async () => {
    try {
      showLoading();
      const data = await Api.netDiskOverview.netDiskOverviewSpace();
      const sp = formatSizeUnits(data.spaceSize).split(' ');
      spaceSize.value = Number(sp[0]);
      spaceUnit.value = sp[1];
      fileSize.value = data.fileSize;
      const fs = formatSizeUnits(data.flowSize).split(' ');
      flowSize.value = Number(fs[0]);
      flowUnit.value = fs[1];
      hitSize.value = data.hitSize;
      // @ts-ignore chart
      flowChartOption.value.xAxis!.data = data.flowTrend.times;
      flowChartOption.value.series![0].data = data.flowTrend.datas.map((e) =>
        (e / 1024 / 1024).toFixed(),
      );
      // @ts-ignore
      spaceChartOption.value.xAxis!.data = data.sizeTrend.times;
      spaceChartOption.value.series![0].data = data.sizeTrend.datas.map((e) =>
        (e / 1024 / 1024).toFixed(),
      );
    } finally {
      hideLoading();
    }
  };
  const showLoading = () => {
    loading.value = true;
  };
  const hideLoading = () => {
    loading.value = false;
  };

  initData();
</script>

<style lang="less" scoped>
  .netdisk-overview-container {
    margin: 20px;

    .ov-header {
      display: flex;
      flex-direction: row;
      margin-left: -20px;
    }

    .ov-content {
      margin: 20px 0;
    }
  }
</style>
