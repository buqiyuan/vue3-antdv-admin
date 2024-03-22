<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({
    name: 'LayoutBreadcrumb',
  });

  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();

  // 点击菜单
  const clickMenuItem = (menuItem: RouteRecordRaw) => {
    const { isExt, extOpenMode, type } = menuItem?.meta || {};

    if (type === 0 && !menuItem.redirect) return;

    if (isExt && extOpenMode === 1) {
      window.open(menuItem.path);
    } else {
      const to = typeof menuItem.redirect === 'string' ? menuItem.redirect : menuItem;
      router.push(to);
    }
  };

  const menus = computed(() => {
    if (route.meta?.namePath) {
      let children = userStore.menus;
      const paths = route.meta?.namePath?.map((item) => {
        const a = children.find((n) => n.name === item);
        children = a?.children || [];
        return a;
      });
      return [
        {
          name: '__index',
          meta: {
            title: '首页',
          },
          children: userStore.menus,
        },
        ...paths,
      ];
    }
    return route.matched;
  });

  const getSelectKeys = (rotueIndex: number) => {
    return [menus.value[rotueIndex + 1]?.name] as string[];
  };
</script>

<template>
  <a-breadcrumb>
    <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem?.name">
      <a-breadcrumb-item>
        <TitleI18n :title="routeItem?.meta?.title" class="cursor-pointer" />
        <template v-if="routeItem?.children?.length" #overlay>
          <a-menu :selected-keys="getSelectKeys(rotueIndex)">
            <template v-for="childItem in routeItem?.children" :key="childItem.name">
              <a-menu-item
                v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                :key="childItem.name"
                @click="clickMenuItem(childItem)"
              >
                <TitleI18n :title="childItem.meta?.title" />
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<style lang="less" scoped></style>
