// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取用户列表 GET /api/system/users */
export async function userList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.UserEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增用户 POST /api/system/users */
export async function userCreate(body: API.UserDto, options?: RequestOptions) {
  return request<any>('/api/system/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 查询用户 GET /api/system/users/${param0} */
export async function userRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserReadParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserEntity>(`/api/system/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 PUT /api/system/users/${param0} */
export async function userUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserUpdateParams,
  body: API.UserUpdateDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除用户 DELETE /api/system/users/${param0} */
export async function userDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}

/** 更改用户密码 POST /api/system/users/${param0}/password */
export async function userPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserPasswordParams,
  body: API.UserPasswordDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/users/${param0}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
