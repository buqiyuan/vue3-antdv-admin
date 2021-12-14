export const sysDept = {
  /** 获取部门列表 */
  list: 'sys/dept/list',
  /** 移动部门 */
  move: 'sys/dept/move',
  /** 更新部门 */
  update: 'sys/dept/update',
  delete: 'sys/dept/delete',
  add: 'sys/dept/add',
  info: 'sys/dept/info',
  transfer: 'sys/dept/transfer',
} as const;

export const values = Object.values(sysDept);

export type SysDeptPerms = typeof values[number];

export default sysDept;
