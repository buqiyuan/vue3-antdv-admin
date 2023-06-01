export const sysParamConfig = {
  page: 'sys/param-config/page',
  info: 'sys/param-config/info',
  add: 'sys/param-config/add',
  update: 'sys/param-config/update',
  delete: 'sys/param-config/delete',
} as const;

export const values = Object.values(sysParamConfig);

export type SysParamConfigPerms = (typeof values)[number];

export default sysParamConfig;
