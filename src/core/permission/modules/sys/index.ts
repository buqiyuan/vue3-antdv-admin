import { SysLogPerms } from './log';
import { SysDeptPerms } from './dept';
import { SysMenuPerms } from './menu';
import { SysOnlinePerms } from './online';
import { SysRolePerms } from './role';
import { SysTaskPerms } from './task';
import { SysUserPerms } from './user';
import { SysServePerms } from './serve';

export type SysPermissionType =
  | SysLogPerms
  | SysDeptPerms
  | SysMenuPerms
  | SysOnlinePerms
  | SysRolePerms
  | SysTaskPerms
  | SysServePerms
  | SysUserPerms;
