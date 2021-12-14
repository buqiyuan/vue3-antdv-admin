export const sysOnline = {
  list: 'sys/online/list',
  kick: 'sys/online/kick',
} as const;

export const values = Object.values(sysOnline);

export type SysOnlinePerms = typeof values[number];

export default sysOnline;
