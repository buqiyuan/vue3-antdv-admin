<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <!--      网站logo start-->
      <logo :collapsed="collapsed" />
      <!--      网站logo end-->
      <!--      侧边菜单栏start-->
      <aside-menu :collapsed="collapsed" />
      <!--      侧边菜单栏end-->
    </a-layout-sider>
    <a-layout>
      <!--      页头 start-->
      <page-header v-model:collapsed="collapsed" />
      <!--      页头end-->
      <!--      内容区域start-->
      <a-layout-content class="layout-content">
        <tabs-view />
      </a-layout-content>
      <!--      内容区域end-->
      <!--      页脚start-->
      <page-footer />
      <!--      页脚end-->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Logo from './logo/index.vue';
  import { TabsView } from './tabs';
  import AsideMenu from './menu/menu.vue';
  import PageHeader from './header/index.vue';
  import PageFooter from './footer';

  export default defineComponent({
    name: 'LayoutComp',
    components: {
      TabsView,
      PageHeader,
      AsideMenu,
      Logo,
      PageFooter,
      [Layout.name]: Layout,
      [Layout.Content.name]: Layout.Content,
      [Layout.Sider.name]: Layout.Sider,
    },
    setup() {
      const collapsed = ref<boolean>(false);
      // 自定义侧边栏菜单收缩和展开时的宽度
      const asiderWidth = computed(() => (collapsed.value ? 80 : 220));

      return {
        collapsed,
        asiderWidth,
      };
    },
  });
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
      overflow: hidden;
    }

    .layout-content {
      flex: none;
    }
  }
</style>
