<template>
  <div class="tabs-view">
    <a-tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <a-tab-pane v-for="tabItem in tabsViewStore.getTabsList" :key="tabItem.fullPath">
        <template #tab>
          <TabsOperator
            :ref="(ins: TabsOperatorInstance) => (itemRefs[tabItem.fullPath] = ins)"
            :tab-item="tabItem"
          />
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <TabsOperator :tab-item="route" :is-extra="true" />
      </template>
    </a-tabs>
    <div class="tabs-view-content" :style="{ overflow }">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Transition
              :name="transitionName"
              mode="out-in"
              appear
              @before-leave="overflow = 'hidden'"
              @after-leave="overflow = 'auto'"
            >
              <keep-alive :include="keepAliveComponents">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </Transition>
            <template #fallback> 正在加载... </template>
          </Suspense>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import TabsOperator from './tabs-operator.vue';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { useKeepAliveStore } from '@/store/modules/keepAlive';

  type TabsOperatorInstance = InstanceType<typeof TabsOperator>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();
  const keepAliveStore = useKeepAliveStore();

  const itemRefs: Recordable<TabsOperatorInstance | null> = {};

  // 解决路由切换动画出现滚动条闪烁问题
  const overflow = ref('auto');
  const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);
  // 缓存的路由组件列表
  const keepAliveComponents = computed(() => keepAliveStore.list);
  /** 过渡动画 */
  const transitionName = computed(() => {
    const name = route.meta?.transitionName;
    if (name === false) {
      return '';
    }
    return name ?? 'fade-slide';
  });

  // tabs 编辑（remove || add）
  const editTabItem = (targetKey: string, action: string) => {
    if (action == 'remove') {
      itemRefs[targetKey]?.removeTab();
    }
  };
  // 切换页面
  const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
  };
</script>

<style lang="less" scoped>
  .dark .tabs-view {
    border-top: 1px solid black;
  }

  .tabs-view {
    border-top: 1px solid #eee;

    :deep(.tabs) {
      .ant-tabs-nav {
        @apply bg-white dark:bg-black;

        margin: 0;
        padding: 4px 20px 0 10px;
        user-select: none;
      }

      .ant-tabs-tabpane {
        display: none;
      }

      .ant-tabs-tab-remove {
        display: flex;
        margin: 0;
        padding: 0;

        .anticon-close {
          padding-left: 6px;
        }
      }

      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        .ant-tabs-tab-remove {
          width: 0;
        }

        .anticon-close {
          visibility: hidden;
          width: 0;
          transition: width 0.3s;
        }

        &:hover {
          .anticon-close {
            visibility: visible;
            width: 16px;
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
      height: calc(100vh - 110px - var(--app-footer-height));
      padding: 20px 14px 0;
      overflow: auto;
    }
  }
</style>
