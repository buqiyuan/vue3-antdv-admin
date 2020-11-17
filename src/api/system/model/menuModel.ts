import { Meta } from '@/router/types';
export interface MenuItem {
  icon: string | null;
  id: number;
  name: string;
  parentId: number;
  sort: number;
  url: string;
}

/**
 * @description: 获取菜单接口
 */
export interface GetByUserIdParams {
  userId: number | string;
}

/**
 * @description: 获取菜单返回值
 */
export type GetMenuListByUserIdResult = MenuItem[];

/**
 * 角色code返回值
 */
export type GetAuthCodeByUserIdResult = string[];
