<template>
  <div class="box">
    <img src="~@/assets/analysis.svg">
    <a-descriptions title="浏览器信息" bordered>
      <a-descriptions-item v-for="(value, key) in browserInfo" :label="key" :key="key">
        {{ value }}
      </a-descriptions-item>
      <a-descriptions-item label="网络状态">
        <a-badge :status="online ? 'processing' : 'default'" :text="online ? '在线' : '离线'"/>
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <!--  下面这段没啥用-->
  <div v-show="false" class="charging">
    <div>{{ batteryStatus }}</div>
    <div v-show="Number.isFinite(battery.dischargingTime) && battery.dischargingTime != 0">
      剩余可使用时间：{{ calcDischargingTime }}
    </div>
    <span v-show="Number.isFinite(battery.chargingTime) && battery.chargingTime != 0">
          距离电池充满需要：{{ calcDischargingTime }}
        </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from 'vue'
import {Descriptions, Badge} from 'ant-design-vue'
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue';
import HuaweiCharge from '@/components/lockscreen/huawei-charge.vue'
import BrowserType from '@/utils/browser-type'
import {useBattery} from "@/hooks/useBattery";
import {useOnline} from '@/hooks/useOnline'

export default defineComponent({
  name: 'welcome',
  components: {
    HuaweiCharge,
    [Badge.name]: Badge,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item,
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
  setup() {
    // 是否联网
    const {online} = useOnline()
    // 获取电池信息
    const {battery, batteryStatus, calcDischargingTime} = useBattery()
    // 获取浏览器信息
    const browserInfo = BrowserType("zh-cn")

    watchEffect(() => {
      Object.assign(browserInfo, {
        距离电池充满需要: Number.isFinite(battery.value.chargingTime) && battery.value.chargingTime != 0 ? calcDischargingTime.value : '未知',
        剩余可使用时间: Number.isFinite(battery.value.dischargingTime) && battery.value.dischargingTime != 0 ? calcDischargingTime.value : '未知',
        电池状态: batteryStatus.value,
        当前电量: battery.value.level + '%'
      })
    })

    return {
      browserInfo, online,
      battery, batteryStatus, calcDischargingTime
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;

  img {
    flex: 1;
  }

  .ant-form {
    flex: 2;
  }
}
</style>
