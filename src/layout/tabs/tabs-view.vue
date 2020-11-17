<template>
  <div class="tabs-view">
    <a-tabs v-model:activeKey="activeKey" @change="changePage" hide-add type="editable-card" @edit="editTabItem"
            class="tabs">
      <template v-for="(pageItem, index) in pageList" :key="pageItem.fullPath">
        <a-tab-pane :closable="pageItem.closable">
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
                  <a-menu-item @click="removeTab(pageItem.fullPath)" key="2">
                    <close-outlined/>
                    关闭
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item @click="closeLeft(pageItem.fullPath, index)" key="3">
                    <vertical-right-outlined/>
                    关闭左侧
                  </a-menu-item>
                  <a-menu-item @click="closeRight(pageItem.fullPath, index)" key="4">
                    <vertical-left-outlined/>
                    关闭右侧
                  </a-menu-item>
                  <a-menu-divider/>
                  <a-menu-item @click="closeOther(pageItem.fullPath)" key="5">
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
              <a-menu-item @click="removeTab(route.fullPath)" key="2">
                <close-outlined/>
                关闭
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item @click="closeOther(route.fullPath)" key="5">
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
        <router-transition :not-need-key="true" :animate="false" />
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, nextTick, toRefs, unref, watch} from 'vue'
import {useRoute, useRouter} from "vue-router";
import components from "@/layout/tabs/components";
import {RouterTransition} from '@/components/transition'
import {createStorage} from '@/utils/Storage'
import {TABS_ROUTES} from '@/store/mutation-types'

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
    const storage = createStorage()

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

    const state = reactive({
      pageList: routes,
      activeKey: route.fullPath,
    })

    const whiteList = ['Redirect', 'login']

    watch(() => route.fullPath, (to, from) => {
      if (whiteList.includes(route.name as string)) return
      state.activeKey = to
      if (!state.pageList.find((item: RouteItem) => unref(item).fullPath == to)) {
        state.pageList.push(getSimpleRoute(route))
      }
    }, {immediate: true})

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
      storage.set(TABS_ROUTES, JSON.stringify(state.pageList))
    })

    // 关闭页面
    const removeTab = (targetKey) => {
      if (state.pageList.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！')
      }
      const index = state.pageList.findIndex(item => item.fullPath == targetKey)
      state.pageList.splice(index, 1)
      // 如果关闭的是当前页
      if (state.activeKey === targetKey) {
        const currentRoute = state.pageList[Math.max(0, state.pageList.length - 1)]
        state.activeKey = currentRoute.fullPath
        router.push(currentRoute)
      }
    }
    // tabs 编辑（remove || add）
    const editTabItem = (targetKey, action: string) => {
      if (action == 'remove') {
        removeTab(targetKey)
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

    // 关闭左侧
    const closeLeft = (fullPath, index) => {
      state.pageList.splice(0, index)
      state.activeKey = fullPath
      router.replace(fullPath)
    }

    // 关闭右侧
    const closeRight = (fullPath, index) => {
      state.pageList.splice(index + 1)
      state.activeKey = fullPath
      router.replace(fullPath)
    }

    // 关闭其他
    const closeOther = (fullPath) => {
      state.pageList = state.pageList.filter(item => item.fullPath == fullPath)
      state.activeKey = fullPath
      router.replace(fullPath)
    }

    // 关闭全部
    const closeAll = () => {
      localStorage.removeItem('routes')
      state.pageList = []
      router.replace('/')
    }

    return {
      ...toRefs(state),
      route,
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
  }

  .tabs-view-content {
    padding: 20px 14px 0;
    /*height: calc(100vh - #{$header-height});*/
    height: calc(100vh - 110px);
    overflow: auto;
  }
}
</style>
