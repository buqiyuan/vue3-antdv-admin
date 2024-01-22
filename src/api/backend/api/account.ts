// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 账户登出 GET /api/account/logout */
export async function accountLogout(options?: RequestOptions) {
  return request<any>('/api/account/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜单列表 GET /api/account/menus */
export async function accountMenu(options?: RequestOptions) {
  return request<API.AccountMenus[]>('/api/account/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更改账户密码 POST /api/account/password */
export async function accountPassword(body: API.PasswordUpdateDto, options?: RequestOptions) {
  return request<any>('/api/account/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取权限列表 GET /api/account/permissions */
export async function accountPermissions(options?: RequestOptions) {
  return request<string[]>('/api/account/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取账户资料 GET /api/account/profile */
export async function accountProfile(options?: RequestOptions) {
  return request<API.AccountInfo>('/api/account/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更改账户资料 PUT /api/account/update */
export async function accountUpdate(body: API.AccountUpdateDto, options?: RequestOptions) {
  return request<any>('/api/account/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
