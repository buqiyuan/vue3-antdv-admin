<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Pencil, Trash2 } from "@lucide/vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { usePermission } from "@/composables/usePermission";

withDefaults(
  defineProps<{
    rows: API.MenuItemInfo[];
    depth?: number;
  }>(),
  {
    depth: 0,
  },
);

const emit = defineEmits<{
  edit: [row: API.MenuItemInfo];
  remove: [id: number];
}>();

const { t } = useI18n();
const { can } = usePermission();

function typeLabel(type: number) {
  if (type === 0) return t("menu.directory");
  if (type === 2) return t("menu.button");
  return t("menu.page");
}
</script>

<template>
  <template v-for="row in rows" :key="row.id">
    <TableRow>
      <TableCell class="font-medium" :style="{ paddingLeft: `${16 + depth * 16}px` }">{{
        row.name
      }}</TableCell>
      <TableCell>{{ typeLabel(row.type) }}</TableCell>
      <TableCell class="max-w-48 truncate">{{ row.path }}</TableCell>
      <TableCell class="max-w-48 truncate">{{ row.permission }}</TableCell>
      <TableCell>{{ row.orderNo }}</TableCell>
      <TableCell>
        <Badge :variant="row.status === 1 ? 'secondary' : 'outline'">
          {{ row.status === 1 ? t("common.enabled") : t("common.disabled") }}
        </Badge>
      </TableCell>
      <TableCell class="text-right">
        <Button
          v-if="can('system:menu:update')"
          variant="ghost"
          size="icon"
          :aria-label="t('common.edit')"
          @click="emit('edit', row)"
        >
          <Pencil />
        </Button>
        <Button
          v-if="can('system:menu:delete')"
          variant="ghost"
          size="icon"
          :aria-label="t('common.delete')"
          @click="emit('remove', row.id)"
        >
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
    <MenuRows
      v-if="row.children?.length"
      :rows="row.children"
      :depth="depth + 1"
      @edit="emit('edit', $event)"
      @remove="emit('remove', $event)"
    />
  </template>
</template>
