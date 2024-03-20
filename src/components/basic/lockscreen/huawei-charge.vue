<template>
  <div class="huawei-charge">
    <div class="number">{{ battery.level.toFixed(0) }}%</div>
    <div class="contrast">
      <div class="circle" />
      <ul class="bubbles">
        <li v-for="i in 15" :key="i" />
      </ul>
    </div>
    <div class="charging">
      <div>{{ batteryStatus }}</div>
      <div v-show="Number.isFinite(battery.dischargingTime) && battery.dischargingTime != 0">
        剩余可使用时间：{{ calcDischargingTime }}
      </div>
      <span v-show="Number.isFinite(battery.chargingTime) && battery.chargingTime != 0">
        距离电池充满需要：{{ calcDischargingTime }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import type { Battery } from '@/hooks/useBattery';

  export default defineComponent({
    name: 'HuaweiCharge',
    // props: ['batteryStatus', 'battery', 'calcDischargingTime'],
    props: {
      battery: {
        // 电池对象
        type: Object as PropType<Battery>,
        default: () => ({}),
      },
      calcDischargingTime: {
        // 电池剩余时间可用时间
        type: String,
        default: '',
      },
      batteryStatus: {
        // 电池状态
        type: String,
        validator: (val: string) => ['充电中', '已充满', '已断开电源'].includes(val),
      },
    },
  });
</script>

<style lang="less" scoped>
  .huawei-charge {
    .generate-columns(15);

    // @for $i from 0 through 15 {
    //   li:nth-child(#{$i}) {
    //     $width: 15 + random(15) + px;

    //     top: 50%;
    //     left: 15 + random(70) + px;
    //     width: $width;
    //     height: $width;
    //     transform: translate(-50%, -50%);
    //     animation: ~'moveToTop `Math.random(6) + 3`s ease-in-out -`Math.random(5000) / 1000`s infinite';
    //   }
    // }

    @keyframes trotate {
      50% {
        border-radius: 45% / 42% 38% 58% 49%;
      }

      100% {
        transform: translate(-50%, -50%) rotate(720deg);
      }
    }

    @keyframes move-to-top {
      90% {
        opacity: 1;
      }

      100% {
        transform: translate(-50%, -180px);
        opacity: 0.1;
      }
    }

    @keyframes hue-rotate {
      100% {
        filter: contrast(15) hue-rotate(360deg);
      }
    }

    position: absolute;
    bottom: 20vh;
    left: 50vw;
    width: 300px;
    height: 400px;
    transform: translateX(-50%);
    .generate-columns(@n, @i: 0) when (@i =< @n) {
      .generate-columns(@n, (@i + 1));
      .column-@{i} {
        width: (@i * 100% / @n);
      }
      li:nth-child(@{i}) {
        @width: unit(~`Math.round(15 + Math.random() * 15) `, px);

        top: 50%;
        left: unit(~`Math.round(Math.random() * 70) `, px);
        width: @width;
        height: @width;
        transform: translate(-50%, -50%);
        animation: move-to-top unit(~`(Math.round(Math.random() * 6) + 3) `, s) ease-in-out
          unit(~`-(Math.random() * 5000 / 1000) `, s) infinite;
      }
    }

    .number {
      position: absolute;
      z-index: 10;
      top: 27%;
      width: 300px;
      color: #fff;
      font-size: 32px;
      text-align: center;
    }

    .contrast {
      width: 300px;
      height: 400px;
      overflow: hidden;
      animation: hue-rotate 10s infinite linear;
      background-color: #000;
      filter: contrast(15) hue-rotate(0);

      .circle {
        position: relative;
        box-sizing: border-box;
        width: 300px;
        height: 300px;
        filter: blur(8px);

        &::after {
          content: '';
          position: absolute;
          top: 40%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translate(-50%, -50%) rotate(0);
          animation: trotate 10s infinite linear;
          border-radius: 42% 38% 62% 49% / 45%;
          background-color: #00ff6f;
        }

        &::before {
          content: '';
          position: absolute;
          z-index: 10;
          top: 40%;
          left: 50%;
          width: 176px;
          height: 176px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background-color: #000;
        }
      }

      .bubbles {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 100px;
        height: 40px;
        transform: translate(-50%, 0);
        border-radius: 100px 100px 0 0;
        background-color: #00ff6f;
        filter: blur(5px);

        li {
          position: absolute;
          border-radius: 50%;
          background: #00ff6f;
        }
      }
    }

    .charging {
      font-size: 20px;
      text-align: center;
    }
  }
</style>
