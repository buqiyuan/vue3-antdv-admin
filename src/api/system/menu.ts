import http from '@/utils/http/axios';
import {
  GetByUserIdParams,
  GetMenuListByUserIdResult,
  GetAuthCodeByUserIdResult,
} from './model/menuModel';

enum Api {
  adminMenus = '/admin/menus',
  GetBtnCodeListByUserId = '/getBtnCodeListByUserId',
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request<GetMenuListByUserIdResult>({
    url: Api.adminMenus,
    method: 'GET',
  }, {

    successMessageText: '获取菜单成功',
    errorMessageText: '获取菜单失败'
  });
}

/**
 * 根据用户Id获取权限编码
 * @param params
 */
export function getBtnCodeListByUserId(params: GetByUserIdParams) {
  return http.request<GetAuthCodeByUserIdResult>({
    url: Api.GetBtnCodeListByUserId,
    method: 'GET',
    params,
  });
}
