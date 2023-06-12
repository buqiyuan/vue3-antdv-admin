/**
 * example
 * path -> ./modules/user
 * <a-button v-if="$auth('user.add')">Button</a-button>
 * path -> ./modules/sys/user
 * <a-button v-if="$auth('sysUser.add')">Button</a-button>
 */
// import type { DataNode } from 'rc-tree-select/es/interface'

import { permissions } from './modules/';
import type { TreeSelectProps } from 'ant-design-vue';
import type { App } from 'vue';
import type { PermissionType } from './modules/types';
import { useUserStore } from '@/store/modules/user';

type DataNode = NonNullable<TreeSelectProps['treeData']>[number];

export const str2tree = (str: string, treeData: DataNode[] = [], separator = ':') => {
  return str.split(separator).reduce((prev, curr, currentIndex, arr) => {
    const path = arr.slice(0, currentIndex + 1).join(':');
    const index = prev.findIndex((item) => item?.path === path);
    if (index !== -1) {
      return prev[index].children;
    } else {
      const item: DataNode = {
        // key: curr,
        path,
        value: curr,
        label: curr,
        children: [],
      };
      prev.push(item);
      return item.children!;
    }
  }, treeData);
};

/**
 * @description 将权限列表转成级联选择器要求的数据格式
 */
export const formarPermsToCascader = () => {
  return Object.values(permissions).reduce<DataNode[]>((prev, module) => {
    Object.values(module).forEach((permStr) => {
      str2tree(permStr, prev);
    });
    return prev;
  }, []);
};

/**
 * 验证权限
 * @param {PermissionType} perm  权限码
 * @returns {boolean} true | false
 */
export const verifyAuth = (perm: PermissionType) => {
  const permCode = perm.split('.').join(':');
  const permissionList = useUserStore().perms;

  return permissionList.some((n) => n === permCode);
};

export default {
  install(app: App) {
    app.config.globalProperties.$auth = verifyAuth;
  },
};
