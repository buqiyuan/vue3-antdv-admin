<template>
  <div class="tabs-view">
    <a-tabs v-model:activeKey="activeKey" @change="changePage" hide-add type="editable-card" @edit="editTabItem"
            class="tabs">
      <template v-for="(pageItem, index) in tabsList" :key="pageItem.fullPath">
        <a-tab-pane>
          <template #tab>
            <a-dropdown :trigger="['contextmenu']">
              <div style="display: inline-block">
                {{ pageItem.meta.title }}
              </div>
              <template v-slot:overlay>
                <a-menu style="user-select: none">
                  <a-menu-item @click="reloadPage" :disabled="activeKey !== pageItem.fullPath" key="1">
                    <reload-outlined/>
                    刷新
                  </a-menu-item>
                  <a-menu-item @click="removeTab(pageItem)" key="2">
                    <close-outlined/>
                    关闭
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item @click="closeLeft(pageItem, index)" key="3">
                    <vertical-right-outlined/>
                    关闭左侧
                  </a-menu-item>
                  <a-menu-item @click="closeRight(pageItem, index)" key="4">
                    <vertical-left-outlined/>
                    关闭右侧
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item @click="closeOther(pageItem)" key="5">
                    <column-width-outlined/>
                    关闭其他
                  </a-menu-item>
                  <a-menu-item @click="closeAll" key="6">
                    <minus-outlined/>
                    关闭全部
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <!--          <span @contextmenu="rightClick" style="display: inline-block" :pagekey="pageItem.fullPath">{{pageItem.meta.title}}</span>-->
          </template>
        </a-tab-pane>
      </template>

      <template v-slot:tabBarExtraContent>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <down-outlined :style="{fontSize: '20px'}"/>
          </a>
          <template v-slot:overlay>
            <a-menu style="user-select: none">
              <a-menu-item @click="reloadPage" :disabled="activeKey !== route.fullPath" key="1">
                <reload-outlined/>
                刷新
              </a-menu-item>
              <a-menu-item @click="removeTab(route)" key="2">
                <close-outlined/>
                关闭
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item @click="closeOther(route)" key="5">
                <column-width-outlined/>
                关闭其他
              </a-menu-item>
              <a-menu-item @click="closeAll" key="6">
                <minus-outlined/>
                关闭全部
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <div class="tabs-view-content">
      <a-card>
        <router-transition />
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, computed, toRefs, unref, provide, watch} from 'vue'
import {useRoute, useRouter} from "vue-router";
import components from "@/layout/tabs/components";
import {RouterTransition} from '@/components/transition'
import {createStorage} from '@/utils/Storage'
import {TABS_ROUTES} from '@/store/mutation-types'
import {createNamespacedHelpers, useStore} from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('tabs-view')
import {message} from 'ant-design-vue'

interface RouteItem {
  fullPath: string;
  hash?: any;
  meta?: any;
  name?: string;
  params?: any;
  path?: string;
  query?: any;
}

export default defineComponent({
  name: "tabs-view",
  components: {
    ...components, RouterTransition
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const storage = createStorage()
    // const tabsViewMutations = mapMutations(['addTabs','closeLeftTabs','closeRightTabs','closeOtherTabs','initTabs','closeCurrentTabs','closeAllTabs'])

    // 获取简易的路由对象
    const getSimpleRoute = (route): RouteItem => {
      const {fullPath, hash, meta, name, params, path, query} = route
      return {fullPath, hash, meta, name, params, path, query}
    }

    let routes: RouteItem[] = []

    try {
      const routesStr = storage.get(TABS_ROUTES) as string | null | undefined
      routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
    } catch (e) {
      routes = [getSimpleRoute(route)]
    }

    // 初始化标签页
    store.commit('tabs-view/initTabs', routes)
    // tabsViewMutations.initTabs(routes)

    const state = reactive({
      activeKey: route.fullPath
    })

    const tabsList = computed(() => store.getters.tabsList)
    console.log(tabsList.value, 'tabsList')

    const whiteList = ['Redirect', 'login']

    watch(() => route.fullPath, (to, from) => {
      if (whiteList.includes(route.name as string)) return
      state.activeKey = to
      // tabsViewMutations.addTabs(getSimpleRoute(route))
      store.commit('tabs-view/addTabs', getSimpleRoute(route))
    }, {immediate: true})

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
      storage.set(TABS_ROUTES, JSON.stringify(tabsList.value))
    })

    // 关闭当前页面
    const removeTab = (route) => {
      if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！')
      }
      // tabsViewMutations.closeCurrentTabs(route)
      store.commit('tabs-view/closeCurrentTabs', route)
      // 如果关闭的是当前页
      if (state.activeKey === route.fullPath) {
        const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
        state.activeKey = currentRoute.fullPath
        router.push(currentRoute)
      }
    }
    // tabs 编辑（remove || add）
    const editTabItem = (targetKey, action: string) => {
      if (action == 'remove') {
        removeTab(tabsList.value.find(item => item.fullPath == targetKey))
      }
    }
    // 切换页面
    const changePage = (key) => {
      state.activeKey = key
      router.push(key)
    }

    // 刷新页面
    const reloadPage = () => {
      router.push({
        path: '/redirect' + unref(route).fullPath,
      })
    }
    // 注入刷新页面方法
    provide('reloadPage', reloadPage)

    // 关闭左侧
    const closeLeft = (route, index) => {
      // tabsViewMutations.closeLeftTabs(route)
      store.commit('tabs-view/closeLeftTabs', route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }

    // 关闭右侧
    const closeRight = (route, index) => {
      // tabsViewMutations.closeRightTabs(route)
      store.commit('tabs-view/closeRightTabs', route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }

    // 关闭其他
    const closeOther = (route) => {
      // tabsViewMutations.closeOtherTabs(route)
      store.commit('tabs-view/closeOtherTabs', route)
      state.activeKey = route.fullPath
      router.replace(route.fullPath)
    }

    // 关闭全部
    const closeAll = () => {
      localStorage.removeItem('routes')
      // tabsViewMutations.closeAllTabs()
      store.commit('tabs-view/closeAllTabs')
      router.replace('/')
    }

    return {
      ...toRefs(state),
      route,
      tabsList,
      changePage,
      editTabItem,
      removeTab,
      closeLeft,
      closeRight,
      closeOther,
      closeAll,
      reloadPage
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs-view {
  border-top: 1px solid #eee;

  ::v-deep(.tabs) {

    .ant-tabs-bar {
      padding: 4px 20px 0 10px;
      margin: 0;
      background-color: white;
      user-select: none;
    }

    .ant-tabs-tabpane {
      display: none;
    }
    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        width: 0;
        transition: width .3s;
      }
      &:hover .anticon-close {
        width: 16px;
      }
    }
  }

  .tabs-view-content {
    padding: 20px 14px 0;
    /*height: calc(100vh - #{$header-height});*/
    height: calc(100vh - 110px);
    overflow: auto;
  }
}
</style>
