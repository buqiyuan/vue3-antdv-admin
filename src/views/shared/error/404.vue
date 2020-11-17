<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>OOPS！你好像走丢了...</h1>
      <router-link :to="defaultPath" class="ant-btn ant-btn-primary">回到首页</router-link>
    </div>
    <img src="~@/assets/404.gif" alt="">
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import store from "@/store";
export default defineComponent({
  name: "404",
  setup() {
    const defaultPath = store.getters.addRouters.find(item => item.name == 'Layout')?.children[0]?.path
    return {defaultPath}
  }
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
