import { onUnmounted, getCurrentInstance } from 'vue';
import type { ContextMenuItem } from '@/components/basic/context-menu';
import { createContextMenu, destroyContextMenu } from '@/components/basic/context-menu';
export type { ContextMenuItem };

export function useContextMenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
