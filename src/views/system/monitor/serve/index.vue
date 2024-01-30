<template>
  <div class="sys-server-stat-container">
    <!-- runtime -->
    <Card class="stat-card" title="运行环境">
      <Descriptions :column="1" :label-style="{ width: '50%' }">
        <Descriptions.Item label="操作系统">{{ runtime.os }}</Descriptions.Item>
        <Descriptions.Item label="系统架构">{{ runtime.arch }}</Descriptions.Item>
        <Descriptions.Item label="Node版本">
          <Tag color="processing" size="small">v{{ runtime.nodeVersion }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="NPM版本">
          <Tag color="processing" size="small">v{{ runtime.npmVersion }}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <!-- CPU -->
    <Card class="stat-card" title="CPU">
      <Descriptions :column="1" :label-style="{ width: '50%' }" :content-style="{ width: '50%' }">
        <Descriptions.Item label="详细">{{ parseCpuInfo }}</Descriptions.Item>
        <Descriptions.Item label="负载">
          <Progress
            :percent="
              formarPercentage(cpu.rawCurrentLoad, cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad)
            "
            :stroke-color="customProgressColor"
          />
        </Descriptions.Item>
        <Descriptions.Item
          v-for="(item, index) in cpu.coresLoad"
          :key="index"
          :label="`核心${index + 1} 负载`"
        >
          <Progress
            :percent="formarPercentage(item.rawLoad, item.rawLoad + item.rawLoadIdle)"
            :stroke-color="customProgressColor"
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <!-- disk -->
    <Card class="stat-card" title="磁盘">
      <div class="disk-info">
        <Descriptions class="disk-info--item" :column="1">
          <Descriptions.Item label="总空间">{{ formatDiskUnit.size }}</Descriptions.Item>
          <Descriptions.Item label="已用空间">{{ formatDiskUnit.used }}</Descriptions.Item>
          <Descriptions.Item label="可用空间">{{ formatDiskUnit.available }}</Descriptions.Item>
        </Descriptions>
        <div class="disk-info--item">
          <Progress
            type="dashboard"
            :percent="parseDiskPercentage"
            :width="100"
            :stroke-color="customProgressColor"
          />
        </div>
      </div>
    </Card>
    <!-- memoty -->
    <Card class="stat-card" title="内存">
      <div class="disk-info">
        <Descriptions class="disk-info--item" :column="1">
          <Descriptions.Item label="总内存">{{ formatMemoryUnit.total }}</Descriptions.Item>
          <Descriptions.Item label="已用内存">{{ formatMemoryUnit.used }}</Descriptions.Item>
          <Descriptions.Item label="可用内存">{{ formatMemoryUnit.free }}</Descriptions.Item>
        </Descriptions>
        <div class="disk-info--item">
          <Progress
            type="dashboard"
            :percent="parseMemoryPercentage"
            :width="100"
            :stroke-color="customProgressColor"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed, toRefs, onMounted, onBeforeUnmount } from 'vue';
  import { Card, Descriptions, Tag } from 'ant-design-vue';
  import { formatSizeUnits } from '@/utils';
  import Api from '@/api/';
  import Progress from '@/components/basic/progress/index.vue';

  defineOptions({
    name: 'SystemMonitorServe',
  });

  let intervalId;

  const sysInfo = reactive({
    runtime: {
      os: '',
      arch: '',
      nodeVersion: '',
      npmVersion: '',
    },
    disk: {
      size: 0,
      used: 0,
      available: 0,
    },
    memory: {
      total: 0,
      available: 0,
    },
    cpu: {
      // Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz
      manufacturer: '',
      brand: '',
      physicalCores: 0,
      model: '',
      speed: 0,
      rawCurrentLoad: 0,
      rawCurrentLoadIdle: 0,
      coresLoad: [],
    },
  });

  const { runtime, disk, memory, cpu } = toRefs<API.ServeStatInfo>(sysInfo);

  const formatDiskUnit = computed(() => {
    return {
      size: formatSizeUnits(disk.value.size),
      used: formatSizeUnits(disk.value.used),
      available: formatSizeUnits(disk.value.available),
    };
  });
  const formatMemoryUnit = computed(() => {
    return {
      total: formatSizeUnits(memory.value.total),
      free: formatSizeUnits(memory.value.available),
      used: formatSizeUnits(memory.value.total - memory.value.available),
    };
  });
  const parseDiskPercentage = computed(() => {
    if (disk.value.size <= 0) {
      return 0;
    }
    return Math.floor((disk.value.used / disk.value.size) * 100);
  });
  const parseMemoryPercentage = computed(() => {
    if (memory.value.total <= 0) {
      return 0;
    }
    return Math.floor(((memory.value.total - memory.value.available) / memory.value.total) * 100);
  });
  const parseCpuInfo = computed(() => {
    return `${cpu.value.manufacturer} ${cpu.value.brand} @ ${cpu.value.speed}GHz`;
  });

  const refresh = async () => {
    const data = await Api.systemServe.serveStat();
    runtime.value = data.runtime;
    disk.value = data.disk;
    memory.value = data.memory;
    cpu.value = data.cpu;
  };
  refresh();
  const customProgressColor = (percentage) => {
    if (percentage < 30) {
      return '#5cb87a';
    } else if (percentage < 70) {
      return '#e6a23c';
    } else {
      return '#f53f3f';
    }
  };
  const formarPercentage = (used, total) => {
    if (total <= 0) {
      return 0;
    }
    return Math.floor((used / total) * 100);
  };

  onMounted(() => {
    intervalId = setInterval(refresh, 10000);
  });
  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
</script>

<style lang="less" scoped>
  .sys-server-stat-container {
    padding: 20px;
    column-gap: 10px;
    column-count: 2;

    .stat-card {
      margin-bottom: 10px;
      break-inside: avoid;
      transform: translateZ(0);

      .disk-info {
        display: flex;
        flex-direction: row;
        width: 100%;

        &--item {
          width: 50%;
        }
      }
    }
  }
</style>
