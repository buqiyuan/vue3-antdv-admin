<template>
  <div>
    <Tabs v-model:activeKey="activeKey">
      <Tabs.TabPane v-for="item in tabs" :key="item.name" :tab="item.title"></Tabs.TabPane>
    </Tabs>
    <router-view #="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Tabs } from 'ant-design-vue';

  defineOptions({
    name: 'DemosNestedRoutes',
  });

  const router = useRouter();
  const route = useRoute();

  const tabs = [
    {
      title: '路由一',
      name: 'demos-nested-routes-one',
    },
    {
      title: '路由二',
      name: 'demos-nested-routes-two',
    },
    {
      title: '路由三',
      name: 'demos-nested-routes-three',
    },
  ];

  const activeKey = ref((route.name as string) || tabs[0].name);

  watch(activeKey, (name) => {
    router.push({ name });
  });
</script>
