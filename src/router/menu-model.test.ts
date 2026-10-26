import { describe, expect, it } from "vite-plus/test";
import { collectPages, joinMenuPath, toNavItems, type BackendMenu } from "./menu-model";

describe("menu paths", () => {
  it("joins relative backend paths and keeps absolute ones", () => {
    expect(joinMenuPath("/system", "user")).toBe("/system/user");
    expect(joinMenuPath("/system", "/system/role")).toBe("/system/role");
    expect(joinMenuPath("", "https://example.com")).toBe("https://example.com");
  });

  it("hides button nodes and show=0 menus, and opens external links as-is", () => {
    const menus: BackendMenu[] = [
      {
        path: "/system",
        name: "System",
        meta: { type: 0, title: "系统", show: 1, orderNo: 2 },
        children: [
          { path: "user", name: "User", meta: { type: 1, title: "用户", show: 1, orderNo: 1 } },
          { path: "secret", name: "Secret", meta: { type: 1, title: "隐藏", show: 0 } },
          { path: "create", name: "Create", meta: { type: 2, title: "新增", show: 1 } },
        ],
      },
      {
        path: "https://nest-admin.buqiyuan.top",
        name: "Docs",
        meta: { type: 1, title: "文档", show: 1, isExt: true, extOpenMode: 1, orderNo: 1 },
      },
    ];

    const nav = toNavItems(menus);
    expect(nav.map((item) => item.path)).toEqual(["https://nest-admin.buqiyuan.top", "/system"]);
    expect(nav[1]?.children?.map((item) => item.path)).toEqual(["/system/user"]);
    expect(nav[0]?.external).toBe(true);
    const pages = collectPages(menus);
    expect(pages.map((page) => page.path)).toEqual(["/system/secret", "/system/user"]);
    expect(pages.find((page) => page.path === "/system/secret")?.hideInMenu).toBe(true);
  });
});
