<template>
  <div class="box">
    <img src="~@/assets/analysis.svg" />
    <Descriptions title="系统信息" bordered>
      <Descriptions.Item key="IP" label="IP">
        {{ loginIp }}
      </Descriptions.Item>
      <Descriptions.Item v-for="(value, key) in browserInfo" :key="key" :label="key">
        {{ value }}
      </Descriptions.Item>
      <Descriptions.Item label="网络状态">
        <Badge :status="online ? 'processing' : 'default'" :text="online ? '在线' : '离线'" />
      </Descriptions.Item>
      <Descriptions.Item label="WebSocket连接情况">
        <Badge :status="statusTextColor" :text="statusText" />
      </Descriptions.Item>
    </Descriptions>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue';
  import { Descriptions, Badge } from 'ant-design-vue';
  import BrowserType from '@/utils/browser-type';
  import { useBattery } from '@/hooks/useBattery';
  import { useOnline } from '@/hooks/useOnline';
  import { useUserStore } from '@/store/modules/user';
  import { useWsStore } from '@/store/modules/ws';
  import { SocketStatus } from '@/core/socket/socket-io';

  defineOptions({
    name: 'DashboardWelcome',
  });

  // import performanceMonitor from '@/utils/performanceMonitor'

  const loginIp = useUserStore().userInfo?.loginIp;
  const wsStore = useWsStore();
  // 是否联网
  const { online } = useOnline();
  // 获取电池信息
  const { battery, batteryStatus, calcDischargingTime } = useBattery();
  // 获取浏览器信息
  const browserInfo = ref(BrowserType('zh-cn'));

  const statusText = computed(() => {
    if (wsStore.status === SocketStatus.CONNECTED) {
      return '正常';
    } else if (wsStore.status === SocketStatus.CONNECTING) {
      return '连接中...';
    } else {
      return '已断开';
    }
  });

  const statusTextColor = computed(() => {
    if (wsStore.status === SocketStatus.CONNECTED) {
      return 'success';
    } else if (wsStore.status === SocketStatus.CONNECTING) {
      return 'warning';
    } else {
      return 'error';
    }
  });

  watchEffect(() => {
    Object.assign(browserInfo.value, {
      距离电池充满需要:
        Number.isFinite(battery.chargingTime) && battery.chargingTime != 0
          ? calcDischargingTime.value
          : '未知',
      剩余可使用时间:
        Number.isFinite(battery.dischargingTime) && battery.dischargingTime != 0
          ? calcDischargingTime.value
          : '未知',
      电池状态: batteryStatus.value,
      当前电量: `${battery.level}%`,
    });
  });

  // console.log(performanceMonitor.getPerformanceData(), 'performanceMonitor')
</script>

<style lang="less" scoped>
  @import '@/styles/theme.less';

  .themeBgColor(box);

  .box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 280px);
    padding: 12px;

    img {
      flex: 1;
      min-height: 0;
    }

    .ant-form {
      flex: 2;
    }
  }
</style>
