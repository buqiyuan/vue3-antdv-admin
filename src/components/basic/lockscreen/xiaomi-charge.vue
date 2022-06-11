<template>
  <div class="xiaomi-charge">
    <div v-for="i in 3" :key="i" class="outer">
      <div class="circle" :style="{ transform: `scale(${1.01 - 0.04 * (i - 1)})` }"></div>
    </div>
    <div class="line-box">
      <div class="line-left"></div>
      <div class="line-left line-right"></div>
      <div class="line-center line-center-left-2"></div>
      <div class="line-center line-center-left-1"></div>
      <div class="line-center"></div>
      <div class="line-center line-center-right-1"></div>
      <div class="line-center line-center-right-2"></div>
    </div>
    <div class="outer" style="transform: scale(0.68)">
      <div class="circle circle-blur" style="padding: 30px"></div>
    </div>
    <div v-for="i in 4" :key="i" class="outer">
      <div
        class="circle-white"
        :style="{
          transform: `scale(${1 - 0.02 * (i - 1)})`,
          animationDuration: `${500 - 20 * (i - 1)}ms`,
        }"
      ></div>
    </div>
    <div class="outer">
      <div class="text">{{ battery.level.toFixed(0) }}<span class="sub">%</span></div>
    </div>
    <div class="light"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import type { Battery } from '@/hooks/useBattery';
  export default defineComponent({
    name: 'XiaomiCharge',
    props: {
      battery: {
        // 电池对象
        type: Object as PropType<Battery>,
        default: () => ({}),
      },
    },
  });
</script>

<style lang="less" scoped>
  .xiaomi-charge {
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes up {
      0% {
        transform: translateY(80px);
      }

      100% {
        transform: translateY(-400px);
      }
    }

    @keyframes light {
      0% {
        opacity: 0.3;
        transform: scale(0.3);
      }

      40% {
        opacity: 0.6;
        transform: scale(1);
      }

      100% {
        opacity: 0;
        transform: scale(0.3);
      }
    }

    position: absolute;
    bottom: 0;
    left: 50vw;
    display: flex;
    width: 300px;
    height: 400px;
    transform: translateX(-50%);
    justify-content: center;

    .circle {
      position: absolute;
      width: 286px;
      height: 286px;
      padding: 2px;
      background: linear-gradient(#c71ff1, #2554ea);
      border-radius: 50%;
    }

    .circle::after {
      display: block;
      width: 100%;
      height: 100%;
      background: #000;
      border-radius: 50%;
      content: ' ';
    }

    .circle-blur {
      filter: blur(5px);
      animation: rotate 5s linear infinite;
    }

    .circle-white {
      position: absolute;
      width: 220px;
      height: 220px;
      border-top: solid 1px rgba(255, 255, 255, 0.06);
      border-bottom: solid 1px rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      animation: rotate 500ms linear infinite;
    }

    .outer {
      position: absolute;
      bottom: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .line-box {
      position: absolute;
      bottom: 0;
      width: 80px;
      height: 400px;
      overflow: hidden;
      background: #000;
    }

    .line-left {
      position: absolute;
      bottom: 0;
      left: -15px;
      width: 30px;
      height: 267px;
      border-top: solid 2px #2554ea;
      border-right: solid 2px #2554ea;
      border-top-right-radius: 40px;
      box-sizing: border-box;
    }

    .line-left::before {
      position: absolute;
      top: -8px;
      left: 0;
      width: 30px;
      height: 100%;
      border-top: solid 2px #2554ea;
      border-right: solid 2px #2554ea;
      border-top-right-radius: 50px;
      content: '';
      transform: scaleY(0.96);
      box-sizing: border-box;
      transform-origin: center top;
    }

    .line-left::after {
      position: absolute;
      top: -14px;
      left: 0;
      width: 30px;
      height: 100%;
      border-top: solid 2px #2554ea;
      border-right: solid 2px #2554ea;
      border-top-right-radius: 60px;
      content: '';
      transform: scaleY(0.92);
      box-sizing: border-box;
      transform-origin: center top;
    }

    .line-right {
      transform: scaleX(-1);
      transform-origin: 55px;
    }

    .line-center {
      position: absolute;
      top: 0;
      left: 39px;
      width: 2px;
      height: 100%;
      background: #231779;
    }

    .line-center::before {
      position: absolute;
      bottom: 10px;
      width: 2px;
      height: 80px;
      background: linear-gradient(#79ccea, transparent);
      border-top-right-radius: 2px;
      border-top-left-radius: 2px;
      content: '';
      animation: up 700ms linear infinite;
    }

    .line-center-left-1 {
      transform: translateX(-9px);
    }

    .line-center-left-2 {
      transform: translateX(-18px);
    }

    .line-center-right-1 {
      transform: translateX(9px);
    }

    .line-center-right-2 {
      transform: translateX(18px);
    }

    .line-center-left-1::before {
      animation-delay: -200ms;
    }

    .line-center-left-2::before {
      animation-delay: -400ms;
    }

    .line-center-right-1::before {
      animation-delay: -300ms;
    }

    .line-center-right-2::before {
      animation-delay: -500ms;
    }

    .text {
      position: absolute;
      width: 200px;
      height: 80px;
      font-size: 70px;
      line-height: 80px;
      color: turquoise;
      text-align: center;
    }

    .sub {
      font-size: 30px;
    }

    .light {
      position: absolute;
      bottom: -150px;
      width: 300px;
      height: 350px;
      background: radial-gradient(#2554ea, transparent 60%);
      border-radius: 50%;
      animation: light 1.2s linear 1 forwards;
    }
  }
</style>
