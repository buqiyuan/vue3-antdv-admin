import { describe, expect, it } from "vite-plus/test";
import { hasPermission } from "./permission";

describe("hasPermission", () => {
  it("allows actions that do not declare a code", () => {
    expect(hasPermission([], undefined)).toBe(true);
    expect(hasPermission(["system:user:create"], "")).toBe(true);
  });

  it("matches the permission strings returned by /api/account/permissions", () => {
    const perms = ["system:user:create", "system:role:update"];
    expect(hasPermission(perms, "system:user:create")).toBe(true);
    expect(hasPermission(perms, "system:user:delete")).toBe(false);
  });
});
