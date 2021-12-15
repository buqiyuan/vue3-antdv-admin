<template>
  <slot v-if="error" name="error">
    {{ error }}
  </slot>
  <Suspense v-else>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
  import { ref, onErrorCaptured } from 'vue';
  const error = ref<any>(null);
  onErrorCaptured((e) => {
    // error.value = '(⊙o⊙)…出了点问题。'
    console.error(e);
    return true;
  });
</script>
