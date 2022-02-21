import type { SysPermissionType } from './sys';
import type { NetdiskPermissionType } from './netdisk';

export type PermissionType = ReplaceAll<SysPermissionType | NetdiskPermissionType, '/', '.'>;
