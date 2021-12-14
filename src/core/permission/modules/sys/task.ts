export const sysTask = {
  page: 'sys/task/page',
  add: 'sys/task/add',
  update: 'sys/task/update',
  delete: 'sys/task/delete',
  once: 'sys/task/once',
  start: 'sys/task/start',
  stop: 'sys/task/stop',
  info: 'sys/task/info',
} as const;

export const values = Object.values(sysTask);

export type SysTaskPerms = typeof values[number];

export default sysTask;
