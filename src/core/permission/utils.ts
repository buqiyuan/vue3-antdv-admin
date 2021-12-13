import type { TreeDataItem as ATreeDataItem } from 'ant-design-vue/lib/tree/Tree';

interface TreeDataItem extends ATreeDataItem {
  children: any;
}

/**
 * 渲染部门至树形控件
 * @param {Array} depts 所有部门
 * @param {Number | null} parentId 父级部门ID
 */
export const formatDept2Tree = (
  depts: API.SysDeptListResult[],
  parentId: number | null = null,
): TreeDataItem[] => {
  return depts
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const arr = formatDept2Tree(depts, item.id);
      return Object.assign(item, {
        title: item.name,
        key: item.id,
        value: item.id,
        formData: item,
        children: arr.length ? arr : null,
      });
    });
};

/**
 * 渲染菜单至树形控件
 * @param {Array} menus 所有菜单
 * @param {Number | null} parentId 父级菜单ID
 */
export const formatMenu2Tree = (
  menus: API.MenuListResult,
  parentId: number | null = null,
): TreeDataItem[] => {
  return menus
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const arr = formatMenu2Tree(menus, item.id);
      return Object.assign(item, {
        title: item.name,
        key: item.id,
        value: item.id,
        formData: item,
        children: arr.length ? arr : null,
      });
    });
};
