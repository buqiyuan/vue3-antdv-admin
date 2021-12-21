<template>
  <div class="tabs-view">
    <Tabs
      v-model:activeKey="state.activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <template v-for="pageItem in tabsList" :key="pageItem.fullPath">
        <Tabs.TabPane>
          <template #tab>
            <Dropdown :trigger="['contextmenu']">
              <div style="display: inline-block">
                {{ getTitle(pageItem.meta?.title) }}
              </div>
              <template #overlay>
                <a-menu style="user-select: none">
                  <a-menu-item
                    key="1"
                    :disabled="state.activeKey !== pageItem.fullPath"
                    @click="reloadPage"
                  >
                    <reload-outlined />
                    刷新
                  </a-menu-item>
                  <a-menu-item key="2" @click="removeTab(pageItem)">
                    <close-outlined />
                    关闭
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3" @click="closeLeft(pageItem)">
                    <vertical-right-outlined />
                    关闭左侧
                  </a-menu-item>
                  <a-menu-item key="4" @click="closeRight(pageItem)">
                    <vertical-left-outlined />
                    关闭右侧
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="5" @click="closeOther(pageItem)">
                    <column-width-outlined />
                    关闭其他
                  </a-menu-item>
                  <a-menu-item key="6" @click="closeAll">
                    <minus-outlined />
                    关闭全部
                  </a-menu-item>
                </a-menu>
              </template>
            </Dropdown>
            <!--          <span @contextmenu="rightClick" style="display: inline-block" :pagekey="pageItem.fullPath">{{pageItem.meta.title}}</span>-->
          </template>
        </Tabs.TabPane>
      </template>

      <template #rightExtra>
        <Dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <down-outlined :style="{ fontSize: '20px' }" />
          </a>
          <template #overlay>
            <a-menu style="user-select: none">
              <a-menu-item
                key="1"
                :disabled="state.activeKey !== route.fullPath"
                @click="reloadPage"
              >
                <reload-outlined />
                刷新
              </a-menu-item>
              <a-menu-item key="2" @click="removeTab(route)">
                <close-outlined />
                关闭
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="5" @click="closeOther(route)">
                <column-width-outlined />
                关闭其他
              </a-menu-item>
              <a-menu-item key="6" @click="closeAll">
                <minus-outlined />
                关闭全部
              </a-menu-item>
            </a-menu>
          </template>
        </Dropdown>
      </template>
    </Tabs>
    <div class="tabs-view-content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveComponents">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, unref, provide, watch } from 'vue';
  import { useRoute, useRouter, RouteLocation } from 'vue-router';
  import { Storage } from '@/utils/Storage';
  import { TABS_ROUTES } from '@/enums/cacheEnum';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import {
    DownOutlined,
    ReloadOutlined,
    CloseOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
  } from '@ant-design/icons-vue';
  import { Dropdown, Tabs } from 'ant-design-vue';
  import { message } from 'ant-design-vue';

  type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();

  const whiteList = ['Redirect', 'login'];

  const state = reactive({
    activeKey: route.fullPath,
  });

  // 标签页列表
  const tabsList = computed(() => tabsViewStore.tabsList.filter((n) => router.hasRoute(n.name!)));

  // 缓存的路由组件列表
  const keepAliveComponents = computed(() => tabsViewStore.keepAliveComponents);

  // 获取简易的路由对象
  const getSimpleRoute = (route): RouteItem => {
    const { fullPath, hash, meta, name, params, path, query } = route;
    return { fullPath, hash, meta, name, params, path, query };
  };

  let routes: RouteItem[] = [];

  try {
    const routesStr = Storage.get(TABS_ROUTES) as string | null | undefined;
    routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
  } catch (e) {
    routes = [getSimpleRoute(route)];
  }

  // 初始化标签页
  tabsViewStore.initTabs(routes);
  // tabsViewMutations.initTabs(routes)

  // 移除缓存组件名称
  const delKeepAliveCompName = () => {
    if (route.meta.keepAlive) {
      const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
        ?.components?.default.name;
      if (name) {
        tabsViewStore.setKeepAliveComponents(
          tabsViewStore.keepAliveComponents.filter((item) => item != name),
        );
      }
    }
  };

  watch(
    () => route.fullPath,
    () => {
      // 不存在的路由
      const notFondRoutes: string[] = [];
      tabsList.value.forEach((item) => {
        if (item.name && !router.hasRoute(item.name)) {
          notFondRoutes.push(item.name as string);
        }
      });
      // 过滤不存在的路由
      if (notFondRoutes.length) {
        tabsViewStore.initTabs(
          tabsList.value.filter((item) => !notFondRoutes.includes(item.name as string)),
        );
      }
    },
  );

  watch(
    () => route.fullPath,
    (to) => {
      if (whiteList.includes(route.name as string)) return;
      state.activeKey = to;
      // tabsViewMutations.addTabs(getSimpleRoute(route))
      tabsViewStore.addTabs(getSimpleRoute(route));
    },
    { immediate: true },
  );

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    Storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
  });

  // 关闭当前页面
  const removeTab = (route) => {
    if (tabsList.value.length === 1) {
      return message.warning('这已经是最后一页，不能再关闭了！');
    }
    delKeepAliveCompName();
    // tabsViewMutations.closeCurrentTabs(route)
    tabsViewStore.closeCurrentTab(route);
    // 如果关闭的是当前页
    if (state.activeKey === route.fullPath) {
      const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
      state.activeKey = currentRoute.fullPath;
      router.push(currentRoute);
    }
  };
  // tabs 编辑（remove || add）
  const editTabItem = (targetKey, action: string) => {
    if (action == 'remove') {
      removeTab(tabsList.value.find((item) => item.fullPath == targetKey));
    }
  };
  // 切换页面
  const changePage = (key) => {
    state.activeKey = key;
    router.push(key);
  };

  // 刷新页面
  const reloadPage = () => {
    delKeepAliveCompName();
    router.push({
      path: '/redirect' + unref(route).fullPath,
    });
  };
  // 注入刷新页面方法
  provide('reloadPage', reloadPage);

  // 关闭左侧
  const closeLeft = (route) => {
    // tabsViewMutations.closeLeftTabs(route)
    tabsViewStore.closeLeftTabs(route);
    state.activeKey = route.fullPath;
    router.replace(route.fullPath);
  };

  // 关闭右侧
  const closeRight = (route) => {
    // tabsViewMutations.closeRightTabs(route)
    tabsViewStore.closeRightTabs(route);
    state.activeKey = route.fullPath;
    router.replace(route.fullPath);
  };

  // 关闭其他
  const closeOther = (route) => {
    // tabsViewMutations.closeOtherTabs(route)
    tabsViewStore.closeOtherTabs(route);
    state.activeKey = route.fullPath;
    router.replace(route.fullPath);
  };

  // 关闭全部
  const closeAll = () => {
    localStorage.removeItem('routes');
    // tabsViewMutations.closeAllTabs()
    tabsViewStore.closeAllTabs();
    router.replace('/');
  };

  const getTitle = (title) => {
    return typeof title === 'string' ? title : title?.['zh_CN'];
  };
</script>

<style lang="less" scoped>
  .tabs-view {
    border-top: 1px solid #eee;

    :deep(.tabs) {
      .ant-tabs-nav {
        padding: 4px 20px 0 10px;
        margin: 0;
        background-color: white;
        user-select: none;
      }

      .ant-tabs-tabpane {
        display: none;
      }

      .ant-tabs-tab-remove {
        display: flex;
        padding: 0;
        margin: 0;
        .anticon-close {
          padding-left: 6px;
        }
      }

      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        .ant-tabs-tab-remove {
          width: 0;
        }
        .anticon-close {
          width: 0;
          visibility: hidden;
          transition: width 0.3s;
        }

        &:hover {
          .anticon-close {
            width: 16px;
            visibility: visible;
            padding-left: 6px;
          }
          .ant-tabs-tab-remove {
            width: unset;
          }
        }
      }
    }

    .tabs-view-content {
      /* height: calc(100vh - #{$header-height}); */
      height: calc(100vh - 110px);
      padding: 20px 14px 0;
      overflow: auto;
    }
  }
</style>
