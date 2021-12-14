export const sysUser = {
  add: 'sys/user/add',
  page: 'sys/user/page',
  info: 'sys/user/info',
  update: 'sys/user/update',
  delete: 'sys/user/delete',
  password: 'sys/user/password',
} as const;

export const values = Object.values(sysUser);

export type SysUserPerms = typeof values[number];

export default sysUser;
