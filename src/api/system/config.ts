import http from '@/utils/http/axios';
import {ContentTypeEnum} from "@/enums/httpEnum";

enum Api {
  sysConfig = '/sys/config',
  sysSetconfig = '/sys/setconfig',
}

/**
 * @description: 获取系统配置
 */
export function sysConfig(params) {
  return http.request({
    url: Api.sysConfig,
    method: 'POST',
    params,
  });
}

/**
 * @description: 设置系统配置
 */
export function sysSetconfig(params) {
  return http.request({
    url: Api.sysSetconfig,
    method: 'POST',
    headers: {
      // 'Content-type': ContentTypeEnum.TEXT
    },
    params,
  }, {
    isParseToJson: false,

    successMessageText: '配置成功',
    errorMessageText: '操作失败'
  });
}
