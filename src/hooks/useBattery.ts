import { computed, onMounted, reactive } from 'vue';

export type Battery = {
  charging: boolean; // 当前电池是否正在充电
  chargingTime: number; // 距离充电完毕还需多少秒，如果为0则充电完毕
  dischargingTime: number; // 代表距离电池耗电至空且挂起需要多少秒
  /**  代表电量的放大等级，这个值在 0.0 至 1.0 之间 */
  level: number;
  [key: string]: any;
};

export const useBattery = () => {
  const battery = reactive<Battery>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  });

  // 当前浏览器是否支持Battery API
  const isSupported = navigator && 'getBattery' in navigator;

  // 更新电池使用状态
  const updateBattery = (target) => {
    for (const key in battery) {
      battery[key] = target[key];
    }
    battery.level = battery.level * 100;
  };

  // 计算电池剩余可用时间
  const calcDischargingTime = computed(() => {
    const hour = battery.dischargingTime / 3600;
    const minute = (battery.dischargingTime / 60) % 60;
    return `${~~hour}小时${~~minute}分钟`;
  });

  // 电池状态
  const batteryStatus = computed(() => {
    if (battery.charging && battery.level >= 100) {
      return '已充满';
    } else if (battery.charging) {
      return '充电中';
    } else {
      return '已断开电源';
    }
  });

  onMounted(async () => {
    const BatteryManager: Battery = (await (window.navigator as any).getBattery?.()) || {};
    updateBattery(BatteryManager);
    console.log(BatteryManager, '电池');

    // 电池充电状态更新时被调用
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target);
      console.log(target, '电池充电状态改变了');
    };
    // 电池充电时间更新时被调用
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target);
      console.log(target, '电池充电了');
    };
    // 电池断开充电时间更新时被调用
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target);
      console.log(target, '电池断开充电了');
    };
    // 电池电量更新时被调用
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target);
      console.log(target, '电量更新了');
    };

    // new Intl.DateTimeFormat('zh', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // }).format(new Date())
  });

  return {
    battery,
    isSupported,
    batteryStatus,
    calcDischargingTime,
  } as const;
};
