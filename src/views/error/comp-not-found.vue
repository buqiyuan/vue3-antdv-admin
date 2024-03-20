<template>
  <a-result
    status="warning"
    title="当前路由缺失前端对应的路由组件导致无法正常显示，请联系开发人员或管理员！"
  />
</template>

<script setup>
  defineOptions({
    name: 'ComponentNotFound',
  });
</script>
