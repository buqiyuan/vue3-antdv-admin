export const sysMenu = {
  list: 'sys/menu/list',
  add: 'sys/menu/add',
  update: 'sys/menu/update',
  info: 'sys/menu/info',
  delete: 'sys/menu/delete',
} as const;

export const deptValues = Object.values(sysMenu);

export type SysMenuPerms = typeof deptValues[number];

export default sysMenu;
