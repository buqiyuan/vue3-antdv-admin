<template>
  <div class="menu-container">
    <Menu
      v-model:open-keys="state.openKeys"
      v-model:selected-keys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name">
        <MenuItem :menu-info="item" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, watch } from 'vue';
  import { Menu } from 'ant-design-vue';
  import MenuItem from './menu-item.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useRoute, useRouter } from 'vue-router';
  import { LOGIN_NAME } from '@/router/constant';

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

  // 根据activeMenu获取指定的menu
  const getTargetMenuByActiveMenuName = (activeMenu: string) => {
    return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu));
  };

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const meta = currentRoute.meta;
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
      return targetMenu?.meta?.namePath ?? [meta?.activeMenu];
    }
    return currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name);
  };

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
      if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
      state.openKeys = getOpenKeys();
      const meta = currentRoute.meta;
      if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
        state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu];
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name];
      }
    },
    {
      immediate: true,
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
