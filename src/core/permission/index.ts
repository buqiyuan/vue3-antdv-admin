/**
 * example
 * path -> ./modules/user
 * <a-button v-if="$auth('user.add')">Button</a-button>
 * path -> ./modules/sys/user
 * <a-button v-if="$auth('sysUser.add')">Button</a-button>
 */
// import type { DataNode } from 'rc-tree-select/lib/interface'

import type { TreeSelectProps } from 'ant-design-vue';

type DataNode = NonNullable<TreeSelectProps['treeData']>[number];

interface Permissions {
  [key: string]: {
    [key: string]: string;
  };
}

const modulesPermissionFiles = require.context('./modules', true, /\.ts$/);
/**
 * 根据接口路径生成接口权限码, eg: sys/user/add => sys:user:add
 * @param str 接口路径
 * @returns {string}
 */
export const generatePermCode = (str: string) => str.replace(/\//g, ':');

/**
 * @description 权限列表
 */
export const permissions: Permissions = modulesPermissionFiles
  .keys()
  .reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // set './sys/app.js' => 'sysApp'
    const moduleName = modulePath
      .replace(/^\.\/(.*)\.\w+$/, '$1')
      .replace(/[-_/][a-z]/gi, (s) => s.substring(1).toUpperCase());
    const value = modulesPermissionFiles(modulePath).default;

    // pass sys/user/add => sys:user:add
    const permissionModule = Object.keys(value).reduce((obj, key) => {
      obj[key] = generatePermCode(value[key]);
      return obj;
    }, {});

    modules[moduleName] = permissionModule;
    // console.log('permissions modules', modules);
    return modules;
  }, {});
// console.log('permissions', permissions);

/**
 * @description 将权限列表转成级联选择器要求的数据格式
 */
export const formarPermsToCascader = () => {
  return Object.keys(permissions).reduce<DataNode[]>((prev, moduleKey) => {
    const module = permissions[moduleKey];
    Object.keys(module).forEach((key) => {
      module[key].split(':').reduce((p, k, currentIndex, arr) => {
        const value = arr.slice(0, currentIndex + 1).join(':');
        const index = p.findIndex((item) => item?.value === value);
        if (Number.isInteger(index) && index !== -1) {
          return p[index].children;
        } else {
          const item: DataNode = {
            // key: k,
            title: k,
            label: k,
            value: value,
            children: [],
          };
          p.push(item);
          return item.children!;
        }
      }, prev);
    });
    return prev;
  }, []);
};

// 挂载所有权限列表到实例上
// !Vue.prototype.$permission && (Vue.prototype.$permission = modules)

// // auth
// !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
//   $auth: {
//     get() {
//       const _this = this
//       return (perm) => {
//         const [pm, action] = perm.split('.')
//         const permissionList = _this.$store.getters.perms
//         if (_this.$permission[pm] && _this.$permission[pm][action]) {
//           return permissionList.indexOf(_this.$permission[pm][action]) > -1
//         }
//         return false
//       }
//     }
//   }
// })
export default permissions;
