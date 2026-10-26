import { describe, expect, it } from "vite-plus/test";
import { collectMenuIds, filterMenuTree, flattenDepts } from "./tree";

describe("tree helpers", () => {
  it("flattens a department tree with depth markers", () => {
    const rows = flattenDepts([
      {
        id: 1,
        name: "总部",
        orderNo: 0,
        creator: "",
        updater: "",
        createdAt: "",
        updatedAt: "",
        children: [
          {
            id: 2,
            name: "研发",
            orderNo: 1,
            creator: "",
            updater: "",
            createdAt: "",
            updatedAt: "",
            children: [],
          },
        ],
      },
    ]);
    expect(rows.map((row) => row.label)).toEqual(["总部", "· 研发"]);
  });

  it("keeps ancestor menus when a child matches the keyword", () => {
    const tree = filterMenuTree(
      [menu(1, "系统", [menu(2, "用户管理", [], "/system/user", "system:user:list")])],
      "user",
    );
    expect(collectMenuIds(tree[0]!)).toEqual([1, 2]);
  });
});

function menu(
  id: number,
  name: string,
  children: API.MenuItemInfo[] = [],
  path = "",
  permission = "",
): API.MenuItemInfo {
  return {
    id,
    name,
    path,
    permission,
    children,
    creator: "",
    updater: "",
    parentId: 0,
    type: 1,
    icon: "",
    orderNo: 0,
    component: "",
    isExt: false,
    extOpenMode: 1,
    keepAlive: 0,
    show: 1,
    activeMenu: "",
    status: 1,
    roles: [],
    createdAt: "",
    updatedAt: "",
  };
}
