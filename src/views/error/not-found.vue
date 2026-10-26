<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/components/ui/button";

const { t } = useI18n();
</script>

<template>
  <div class="mx-auto max-w-lg space-y-3 py-16 text-center">
    <h1 class="text-2xl font-semibold">{{ t("error.notFound") }}</h1>
    <p class="text-sm text-muted-foreground">{{ t("error.notFoundHint") }}</p>
    <Button as-child>
      <RouterLink to="/dashboard/welcome">{{ t("error.backHome") }}</RouterLink>
    </Button>
  </div>
</template>
