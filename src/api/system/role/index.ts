import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminRole = '/admin/role',
  adminRoleAccess = '/admin/role_access',
}

/**
 * 获取角色权限资源列表
 * @param params
 */
export function getAdminRoleAccess(id?: string | number) {
  return http.request({
    url: [Api.adminRoleAccess, id].join('/'),
    method: RequestEnum.GET,
  });
}

/**
 * 获取角色列表
 * @param params
 */
export function getAdminRole(params) {
  return http.request({
    url: Api.adminRole,
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 删除角色
 * @param params
 */
export function delAdminRole(id: string) {
  return http.request({
    url: [Api.adminRole, id].join('/'),
    method: RequestEnum.DELETE,
  }, {
    isTransformRequestResult: false, // 不转换响应结果，保留code,message等信息用于判断
    successMessageText: '删除成功',
    errorMessageText: '删除失败'
  });
}

/**
 * 修改角色
 * @param params
 */
export function patchAdminRole(id, params) {
  return http.request({
    url: [Api.adminRole, id].join('/'),
    method: RequestEnum.PATCH,
    params,
  }, {
    isTransformRequestResult: false, // 不转换响应结果，保留code,message等信息用于判断
    successMessageText: '修改成功',
    errorMessageText: '修改失败'
  });
}


/**
 * 新建角色
 * @param params
 */
export function postAdminRole(params) {
  return http.request({
    url: Api.adminRole,
    method: RequestEnum.POST,
    params,
  }, {
    successMessageText: '创建成功',
    errorMessageText: '创建失败'
  });
}
