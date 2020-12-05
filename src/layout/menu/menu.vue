<template>
  <a-menu
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item"/>
    </template>
  </a-menu>
</template>

<script lang="ts">
import {defineComponent, reactive, computed, watch, toRefs} from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import {Menu} from 'ant-design-vue';
import MenuItem from './menu-item.vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from 'vuex'
import {routes} from "@/router";

export default defineComponent({
  components: {
    MenuItem,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  props: {
    collapsed: { // 侧边栏菜单是否收起
      type: Boolean
    }
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const store = useStore()

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.name]

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name]
    })

    const menus = computed(() => store.getters.menus.length > 0 ? store.getters.menus : routes.find(item => item.name == 'Layout')!.children)

    // 监听菜单收缩状态
    watch(() => props.collapsed, (newVal) => {
      state.openKeys = newVal ? [] : getOpenKeys()
      state.selectedKeys = [currentRoute.name]
    })

    // 跟随页面路由变化，切换菜单选中状态
    watch(() => currentRoute.fullPath, () => {
      if (currentRoute.name == 'login' || props.collapsed) return
      state.openKeys = getOpenKeys()
      state.selectedKeys = [currentRoute.name]
    })

    // 点击菜单
    const clickMenuItem = ({item, key, keyPath}) => {
      router.push({name: key})
    }

    return {
      ...toRefs(state),
      menus,
      clickMenuItem
    }
  }
})
</script>
