export const sysLog = {
  req: 'sys/log/req/page',
  login: 'sys/log/login/page',
  task: 'sys/log/task/page',
} as const;

export const values = Object.values(sysLog);

export type SysLogPerms = typeof values[number];

export default sysLog;
