export const netdiskMange = {
  list: 'netdisk/manage/list',
  mkdir: 'netdisk/manage/mkdir',
  token: 'netdisk/manage/token',
  rename: 'netdisk/manage/rename',
  download: 'netdisk/manage/download',
  delete: 'netdisk/manage/delete',
  check: 'netdisk/manage/check',
  info: 'netdisk/manage/info',
  mark: 'netdisk/manage/mark',
  cut: 'netdisk/manage/cut',
  copy: 'netdisk/manage/copy',
} as const;

export const values = Object.values(netdiskMange);

export type NetdiskMangePerms = typeof values[number];

export default netdiskMange;
