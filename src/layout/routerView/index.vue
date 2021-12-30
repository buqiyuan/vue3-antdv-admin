<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <suspense>
            <component :is="Component" />
            <template #fallback>
              <div> Loading... </div>
            </template>
          </suspense>
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'LayoutParentView',
  };
</script>
