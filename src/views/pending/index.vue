<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const route = useRoute();
const { t } = useI18n();
const componentPath = computed(() => route.meta.componentPath || route.path);
</script>

<template>
  <Alert>
    <AlertTitle>{{ route.meta.title || t("pending.title") }}</AlertTitle>
    <AlertDescription>
      {{ t("pending.body", { path: componentPath }) }}
    </AlertDescription>
  </Alert>
</template>
