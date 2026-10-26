import { useUserStore } from "@/stores/user";
import { hasPermission } from "@/auth/permission";

export function usePermission() {
  const user = useUserStore();
  function can(code?: string) {
    return hasPermission(user.permissions, code);
  }
  return { can };
}
