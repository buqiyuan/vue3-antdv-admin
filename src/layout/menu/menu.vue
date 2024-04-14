<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="selectedKeys"
      :open-keys="isSideMenu ? openKeys : []"
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
  import { ref, computed, watch, type PropType } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Menu, type MenuTheme, type MenuProps } from 'ant-design-vue';
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
  const openKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([currentRoute.name as string]);

  const menus = computed(() => userStore.menus);
  // console.log('menus', menus.value);
  /** 侧边栏布局 */
  const isSideMenu = computed(() => layoutSettingStore.layoutSetting.layout === 'sidemenu');
  const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name);

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    return (
      currentRoute.meta?.namePath ?? (currentRoute.matched.slice(1).map((n) => n.name) as string[])
    );
  };

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    () => {
      selectedKeys.value = [currentRoute.name] as string[];
      setTimeout(() => {
        openKeys.value = getOpenKeys();
      });
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      selectedKeys.value = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[];
      if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
      openKeys.value = getOpenKeys();
    },
    {
      immediate: true,
    },
  );

  // 点击菜单
  const clickMenuItem: MenuProps['onClick'] = ({ key }) => {
    if (key === currentRoute.name) return;
    const preSelectedKeys = selectedKeys.value;
    const targetRoute = getRouteByName(key as string);
    const { isExt, extOpenMode } = targetRoute?.meta || {};
    if (targetRoute && isExt && extOpenMode === 1) {
      queueMicrotask(() => {
        selectedKeys.value = preSelectedKeys;
      });
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
