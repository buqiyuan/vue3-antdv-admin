<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>OOPS！你好像走丢了...</h1>
      <router-link to="/" class="ant-btn ant-btn-primary">回到首页</router-link>
    </div>
    <img src="~@/assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'NotFound',
  });
</script>

<style lang="less" scoped>
  .page-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: white;
    justify-content: center;
    align-items: center;
  }
</style>
