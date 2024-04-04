// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取所有菜单列表 GET /api/system/menus */
export async function menuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuListParams,
  options?: RequestOptions,
) {
  return request<API.MenuItemInfo[]>('/api/system/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增菜单或权限 POST /api/system/menus */
export async function menuCreate(body: API.MenuDto, options?: RequestOptions) {
  return request<any>('/api/system/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 获取菜单或权限信息 GET /api/system/menus/${param0} */
export async function menuInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/menus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新菜单或权限 PUT /api/system/menus/${param0} */
export async function menuUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuUpdateParams,
  body: API.MenuUpdateDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/menus/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除菜单或权限 DELETE /api/system/menus/${param0} */
export async function menuDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/menus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}

/** 获取后端定义的所有权限集 GET /api/system/menus/permissions */
export async function menuGetPermissions(options?: RequestOptions) {
  return request<string[]>('/api/system/menus/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}
