<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <Suspense
            @resolve="handleStatusChange('resolve')"
            @fallback="handleStatusChange('fallback')"
            @pending="handleStatusChange('pending')"
          >
            <component :is="Component" :suspense-status="suspenseStatus" />
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
  import { ref } from 'vue';

  defineOptions({
    name: 'LayoutParentView',
  });

  const suspenseStatus = ref('');

  const handleStatusChange = (status: string) => {
    suspenseStatus.value = status;
  };
</script>
