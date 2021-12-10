<template>
  <a-menu
    v-model:open-keys="state.openKeys"
    v-model:selected-keys="state.selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="props.collapsed"
    class="menu-container"
    @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </a-menu>
</template>

<script setup lang="ts">
  import { reactive, computed, watch } from 'vue';
  import MenuItem from './menu-item.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useRoute, useRouter } from 'vue-router';

  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
  });
  const userStore = useUserStore();
  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();

  const menus = computed(() => userStore.menus);

  // 获取当前打开的子菜单
  const getOpenKeys = () =>
    currentRoute.meta?.keyPath ?? currentRoute.matched.slice(1).map((n) => n.name);

  const state = reactive({
    openKeys: getOpenKeys(),
    selectedKeys: [currentRoute.name],
  });

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    (newVal) => {
      state.openKeys = newVal ? [] : getOpenKeys();
      state.selectedKeys = [currentRoute.name];
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name == 'login' || props.collapsed) return;
      state.openKeys = getOpenKeys();
      state.selectedKeys = [currentRoute.name];
    },
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    if (key === currentRoute.name) return;
    if (/http(s)?:/.test(key)) {
      window.open(key);
    } else {
      router.push({ name: key });
    }
  };
</script>

<style lang="less" scoped>
  .menu-container {
    height: calc(100vh - 64px);
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>
