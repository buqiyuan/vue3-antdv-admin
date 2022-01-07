<template>
  <div class="tabs-view">
    <Tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <Tabs.TabPane v-for="pageItem in tabsList" :key="pageItem.fullPath">
        <template #tab>
          <Dropdown :trigger="['contextmenu']">
            <div style="display: inline-block">
              <TitleI18n :title="pageItem.meta?.title" />
            </div>
            <template #overlay>
              <Menu style="user-select: none">
                <Menu.Item key="1" :disabled="activeKey !== pageItem.fullPath" @click="reloadPage">
                  <reload-outlined />
                  {{ $t('layout.multipleTab.reload') }}
                </Menu.Item>
                <Menu.Item key="2" @click="removeTab(pageItem)">
                  <close-outlined />
                  {{ $t('layout.multipleTab.close') }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" @click="closeLeft(pageItem)">
                  <vertical-right-outlined />
                  {{ $t('layout.multipleTab.closeLeft') }}
                </Menu.Item>
                <Menu.Item key="4" @click="closeRight(pageItem)">
                  <vertical-left-outlined />
                  {{ $t('layout.multipleTab.closeRight') }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5" @click="closeOther(pageItem)">
                  <column-width-outlined />
                  {{ $t('layout.multipleTab.closeOther') }}
                </Menu.Item>
                <Menu.Item key="6" @click="closeAll">
                  <minus-outlined />
                  {{ $t('layout.multipleTab.closeAll') }}
                </Menu.Item>
              </Menu>
            </template>
          </Dropdown>
        </template>
      </Tabs.TabPane>

      <template #rightExtra>
        <Dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <down-outlined :style="{ fontSize: '20px' }" />
          </a>
          <template #overlay>
            <Menu style="user-select: none">
              <Menu.Item key="1" :disabled="activeKey !== route.fullPath" @click="reloadPage">
                <reload-outlined />
                {{ $t('layout.multipleTab.reload') }}
              </Menu.Item>
              <Menu.Item key="2" @click="removeTab(route)">
                <close-outlined />
                {{ $t('layout.multipleTab.close') }}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="5" @click="closeOther(route)">
                <column-width-outlined />
                {{ $t('layout.multipleTab.closeOther') }}
              </Menu.Item>
              <Menu.Item key="6" @click="closeAll">
                <minus-outlined />
                {{ $t('layout.multipleTab.closeAll') }}
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
      </template>
    </Tabs>
    <div class="tabs-view-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition name="fade-transform" mode="out-in" appear>
            <keep-alive :include="keepAliveComponents">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, unref, watch } from 'vue';
  import { useRoute, useRouter, RouteLocation } from 'vue-router';
  import { Storage } from '@/utils/Storage';
  import { TABS_ROUTES } from '@/enums/cacheEnum';
  import { useTabsViewStore, blackList } from '@/store/modules/tabsView';
  import { useKeepAliveStore } from '@/store/modules/keepAlive';
  import {
    DownOutlined,
    ReloadOutlined,
    CloseOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
  } from '@ant-design/icons-vue';
  import { Dropdown, Tabs, message, Menu } from 'ant-design-vue';
  import { REDIRECT_NAME } from '@/router/constant';
  import { TitleI18n } from '@/components/basic/title-i18n';

  type RouteItem = Omit<RouteLocation, 'matched' | 'redirectedFrom'>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();
  const keepAliveStore = useKeepAliveStore();

  const activeKey = computed(() => route.fullPath);

  // 标签页列表
  const tabsList = computed(() => tabsViewStore.getTabsList);

  // 缓存的路由组件列表
  const keepAliveComponents = computed(() => keepAliveStore.list);

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

  // 将当前组件从keep-alive缓存中移除
  const delCurrCompFromKeepAlive = () => {
    if (route.meta.keepAlive) {
      const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
        ?.components?.default.name;
      if (name) {
        keepAliveStore.remove(name);
      }
    }
  };

  watch(
    () => route.fullPath,
    () => {
      if (blackList.some((n) => n === route.name)) return;
      // tabsViewMutations.addTabs(getSimpleRoute(route))
      tabsViewStore.addTabs(getSimpleRoute(route));
    },
    { immediate: true },
  );

  // 在页面关闭或刷新之前，保存数据
  window.addEventListener('beforeunload', () => {
    Storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
  });

  // 目标路由是否等于当前路由
  const isCurrentRoute = (route) => {
    return router.currentRoute.value.matched.some((item) => item.name === route.name);
  };

  // 关闭当前页面
  const removeTab = (route) => {
    if (tabsList.value.length === 1) {
      return message.warning('这已经是最后一页，不能再关闭了！');
    }
    delCurrCompFromKeepAlive();
    // tabsViewMutations.closeCurrentTabs(route)
    tabsViewStore.closeCurrentTab(route);
    // 如果关闭的是当前页
    if (activeKey.value === route.fullPath) {
      const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
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
    router.push(key);
  };

  // 刷新页面
  const reloadPage = () => {
    delCurrCompFromKeepAlive();
    router.replace({
      name: REDIRECT_NAME,
      params: {
        path: unref(route).fullPath,
      },
    });
  };

  // 关闭左侧
  const closeLeft = (route) => {
    // tabsViewMutations.closeLeftTabs(route)
    tabsViewStore.closeLeftTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭右侧
  const closeRight = (route) => {
    // tabsViewMutations.closeRightTabs(route)
    tabsViewStore.closeRightTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭其他
  const closeOther = (route) => {
    // tabsViewMutations.closeOtherTabs(route)
    tabsViewStore.closeOtherTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
  };

  // 关闭全部
  const closeAll = () => {
    localStorage.removeItem('routes');
    // tabsViewMutations.closeAllTabs()
    tabsViewStore.closeAllTabs();
    router.replace('/');
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
