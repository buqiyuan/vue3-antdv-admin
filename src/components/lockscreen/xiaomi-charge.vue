<template>
  <div class="container">
    <div v-for="i in 3" :key="i" class="outer">
      <div class="circle" :style="{transform: `scale(${1.01 - 0.04 * (i - 1)})`}"></div>
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
    <div class="outer" style="transform: scale(.68);">
      <div class="circle circle-blur" style="padding: 30px;"></div>
    </div>
    <div v-for="i in 4" :key="i" class="outer">
      <div class="circle-white" :style="{transform: `scale(${1 - 0.02 * (i - 1)})`, 'animation-duration': `${500 - 20 * (i - 1)}ms`}"></div>
    </div>
    <div class="outer">
      <div class="text">{{ battery.level }}<span class="sub">%</span></div>
    </div>
    <div class="light"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "xiaomi-charge",
  props: {
    battery: { // 电池对象
      type: Object,
      default: () => ({})
    },
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 50vw;
  bottom: 0;
  display: flex;
  justify-content: center;
  transform: translateX(-50%);
  width: 300px;
  height: 400px;
}

.circle {
  position: absolute;
  width: 286px;
  height: 286px;
  border-radius: 50%;
  background: linear-gradient(#c71ff1, #2554ea);
  padding: 2px;
}

.circle::after {
  display: block;
  content: ' ';
  border-radius: 50%;
  background: #000;
  width: 100%;
  height: 100%;
}

.circle-blur {
  filter: blur(5px);
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.circle-white {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border-top: solid 1px rgba(255, 255, 255, .06);
  border-bottom: solid 1px rgba(255, 255, 255, .08);
  animation: rotate 500ms linear infinite;
}

.outer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 400px;
}

.line-box {
  position: absolute;
  width: 80px;
  height: 400px;
  bottom: 0;
  background: #000;
  overflow: hidden;
}

.line-left {
  position: absolute;
  left: -15px;
  width: 30px;
  bottom: 0;
  height: 267px;
  border-right: solid 2px #2554ea;
  border-top: solid 2px #2554ea;
  box-sizing: border-box;
  border-top-right-radius: 40px;
}

.line-left::before {
  position: absolute;
  left: 0;
  top: -8px;
  width: 30px;
  height: 100%;
  border-right: solid 2px #2554ea;
  border-top: solid 2px #2554ea;
  box-sizing: border-box;
  border-top-right-radius: 50px;
  content: '';
  transform-origin: center top;
  transform: scaleY(.96);
}

.line-left::after {
  position: absolute;
  left: 0;
  top: -14px;
  width: 30px;
  height: 100%;
  border-right: solid 2px #2554ea;
  border-top: solid 2px #2554ea;
  box-sizing: border-box;
  border-top-right-radius: 60px;
  content: '';
  transform-origin: center top;
  transform: scaleY(.92);
}

.line-right {
  transform-origin: 55px;
  transform: scaleX(-1);
}

.line-center {
  position: absolute;
  left: 39px;
  top: 0;
  height: 100%;
  width: 2px;
  background: #231779;
}

.line-center::before {
  position: absolute;
  bottom: 10px;
  content: '';
  width: 2px;
  height: 80px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background: linear-gradient(#79ccea, transparent);
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

@keyframes up {
  0% {
    transform: translateY(80px);
  }
  100% {
    transform: translateY(-400px);
  }
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
  width: 300px;
  height: 350px;
  bottom: -150px;
  border-radius: 50%;
  animation: light 1.2s linear 1 forwards;
  background: radial-gradient(#2554ea, transparent 60%);
}

@keyframes light {
  0% {
    transform: scale(.3);
    opacity: .3;
  }
  40% {
    transform: scale(1);
    opacity: .6;
  }
  100% {
    transform: scale(.3);
    opacity: 0;
  }
}
</style>
