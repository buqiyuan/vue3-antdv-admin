<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/components/ui/button";

const props = defineProps<{
  page: number;
  pageSize: number;
  total: number;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
}>();

const { t } = useI18n();
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
</script>

<template>
  <div class="flex items-center justify-between gap-3 pt-4">
    <p class="text-sm text-muted-foreground">
      {{ t("common.total", { n: total }) }}
    </p>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="page <= 1"
        @click="emit('update:page', page - 1)"
      >
        {{ t("common.prev") }}
      </Button>
      <span class="text-sm tabular-nums">{{ page }} / {{ pages }}</span>
      <Button
        variant="outline"
        size="sm"
        :disabled="page >= pages"
        @click="emit('update:page', page + 1)"
      >
        {{ t("common.next") }}
      </Button>
    </div>
  </div>
</template>
