<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>OOPS！你好像走丢了...</h1>
      <router-link to="/" class="ant-btn ant-btn-primary">回到首页</router-link>
    </div>
    <img src="~@/assets/404.gif" alt="">
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {routes} from "@/router";
export default defineComponent({
  name: "404",
})
</script>

<style lang="scss" scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
