<template>
  <div class="container">
    <div class="number">{{ battery.level }}%</div>
    <div class="contrast">
      <div class="circle"></div>
      <ul class="bubbles">
        <li v-for="i in 15" :key="i"></li>
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
import {defineComponent} from 'vue'

export default defineComponent({
  name: "huawei-charge",
  // props: ['batteryStatus', 'battery', 'calcDischargingTime'],
  props: {
    battery: { // 电池对象
      type: Object,
      default: () => ({})
    },
    calcDischargingTime: { // 电池剩余时间可用时间
      type: String,
      default: ''
    },
    batteryStatus: { // 电池状态
      type: String,
      validator: (val: string) => ['充电中', '已充满', '已断开电源'].includes(val)
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 50vw;
  bottom: 20vh;
  transform: translateX(-50%);
  width: 300px;
  height: 400px;

  .number {
    position: absolute;
    width: 300px;
    top: 27%;
    text-align: center;
    font-size: 32px;
    z-index: 10;
    color: #fff;
  }

  .contrast {
    filter: contrast(15) hue-rotate(0);
    width: 300px;
    height: 400px;
    background-color: #000;
    overflow: hidden;
    animation: hueRotate 10s infinite linear;

    .circle {
      position: relative;
      width: 300px;
      height: 300px;
      box-sizing: border-box;
      filter: blur(8px);

      &::after {
        content: "";
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0);
        width: 200px;
        height: 200px;
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        animation: rotate 10s infinite linear;
      }

      &::before {
        content: "";
        position: absolute;
        width: 176px;
        height: 176px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: #000;
        z-index: 10;
      }
    }

    .bubbles {
      position: absolute;
      left: 50%;
      bottom: 0;
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
    text-align: center;
    font-size: 20px;
  }
}


@for $i from 0 through 15 {
  li:nth-child(#{$i}) {
    $width: 15 + random(15) + px;
    left: 15 + random(70) + px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $width;
    height: $width;
    animation: moveToTop #{random(6) + 3}s ease-in-out -#{random(5000)/1000}s infinite;
  }
}

@keyframes rotate {
  50% {
    border-radius: 45% / 42% 38% 58% 49%;
  }
  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }
  100% {
    opacity: .1;
    transform: translate(-50%, -180px);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}

</style>
