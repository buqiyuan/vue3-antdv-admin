export function hasPermission(permissions: readonly string[], code?: string | null) {
  if (!code) return true;
  return permissions.includes(code);
}
