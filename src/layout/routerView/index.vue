<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              <a-skeleton />
            </template>
          </Suspense>
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'LayoutParentView',
  });
</script>
