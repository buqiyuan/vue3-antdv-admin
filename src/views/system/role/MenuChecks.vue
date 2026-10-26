<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";

withDefaults(
  defineProps<{
    nodes: API.MenuItemInfo[];
    selected: number[];
    depth?: number;
  }>(),
  {
    depth: 0,
  },
);

const emit = defineEmits<{
  toggle: [node: API.MenuItemInfo, checked: boolean];
}>();
</script>

<template>
  <ul class="grid gap-1">
    <li v-for="node in nodes" :key="node.id">
      <label
        class="flex items-center gap-2 py-1 text-sm"
        :style="{ paddingLeft: `${depth * 16}px` }"
      >
        <Checkbox
          :checked="selected.includes(node.id)"
          @update:checked="emit('toggle', node, $event === true)"
        />
        <span>{{ node.name }}</span>
        <span v-if="node.permission" class="text-xs text-muted-foreground">{{
          node.permission
        }}</span>
      </label>
      <MenuChecks
        v-if="node.children?.length"
        :nodes="node.children"
        :selected="selected"
        :depth="depth + 1"
        @toggle="(child, checked) => emit('toggle', child, checked)"
      />
    </li>
  </ul>
</template>
