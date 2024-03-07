<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name">
        <SubMenuItem :item="item" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, watch, type PropType } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Menu, type MenuTheme } from 'ant-design-vue';
  import SubMenuItem from './components/sub-menu-item.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';
  import { LOGIN_NAME } from '@/router/constant';

  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const userStore = useUserStore();
  const layoutSettingStore = useLayoutSettingStore();
  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const state = reactive({
    openKeys: [] as string[],
    selectedKeys: [currentRoute.name] as string[],
  });

  const menus = computed(() => userStore.menus);
  // console.log('menus', menus.value);
  /** 侧边栏布局 */
  const isSideMenu = computed(() => layoutSettingStore.layoutSetting.layout === 'sidemenu');
  const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name);
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

    return (
      meta?.hideInMenu
        ? state?.openKeys || []
        : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
    ) as string[];
  };

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    (newVal) => {
      state.openKeys = newVal ? [] : getOpenKeys();
      state.selectedKeys = [currentRoute.name] as string[];
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
        state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[];
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[];
      }
    },
    {
      immediate: true,
    },
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    if (key === currentRoute.name) return;
    const preSelectedKeys = state.selectedKeys;
    const targetRoute = getRouteByName(key);
    const { isExt, extOpenMode } = targetRoute?.meta || {};
    if (targetRoute && isExt && extOpenMode === 1) {
      queueMicrotask(() => {
        state.selectedKeys = preSelectedKeys;
      });
    } else {
      router.push({ name: key });
    }
  };
</script>

<style lang="less" scoped>
  .menu-container {
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &.is-side-menu {
      height: calc(100vh - var(--app-header-height));
    }

    & > :deep(.ant-menu) {
      justify-content: center;
      width: 100%;
    }
  }
</style>
