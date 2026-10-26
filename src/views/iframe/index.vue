<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const src = computed(() => route.meta.iframeSrc || "");
</script>

<template>
  <iframe
    :src="src"
    class="h-[calc(100vh-8rem)] w-full rounded-xl border bg-card"
    :title="route.meta.title || 'frame'"
  />
</template>
