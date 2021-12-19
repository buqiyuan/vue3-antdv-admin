export const sysServe = {
  stat: 'sys/serve/stat',
} as const;

export const values = Object.values(sysServe);

export type SysServePerms = typeof values[number];

export default sysServe;
