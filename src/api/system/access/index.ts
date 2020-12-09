import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminAccess = '/admin/access',
  adminAccessModule = '/admin/access/module',
}

/**
 * 获取模块列表
 * @param params
 */
export function getAdminAccessModule(params?: object) {
  return http.request({
    url: Api.adminAccessModule,
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 获取资源管理列表
 * @param params
 */
export function getAdminAccess(params) {
  return http.request({
    url: Api.adminAccess,
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 删除资源
 * @param params
 */
export function delAdminAccess(id: string) {
  return http.request({
    url: [Api.adminAccess, id].join('/'),
    method: RequestEnum.DELETE,
  }, {
    isTransformRequestResult: false, // 不转换响应结果，保留code,message等信息用于判断
    successMessageText: '删除成功',
    errorMessageText: '删除失败'
  });
}

/**
 * 修改资源
 * @param params
 */
export function patchAdminAccess(id, params) {
  return http.request({
    url: [Api.adminAccess, id].join('/'),
    method: RequestEnum.PATCH,
    params,
  }, {
    isTransformRequestResult: false, // 不转换响应结果，保留code,message等信息用于判断
    successMessageText: '修改成功',
    errorMessageText: '修改失败'
  });
}


/**
 * 新建资源
 * @param params
 */
export function postAdminAccess(params) {
  return http.request({
    url: Api.adminAccess,
    method: RequestEnum.POST,
    params,
  }, {
    isTransformRequestResult: false, // 不转换响应结果，保留code,message等信息用于判断
    successMessageText: '创建成功',
    errorMessageText: '创建失败'
  });
}
