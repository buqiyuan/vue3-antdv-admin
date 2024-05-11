// @ts-ignore
/* eslint-disable */

/**
 * 该文件为 @umijs/openapi 插件自动生成，请勿随意修改。如需修改请通过配置 openapi.config.ts 进行定制化。
 * */

import { request, type RequestOptions } from '@/utils/request';

/** 获取网盘空间数据统计 GET /api/netdisk/overview/desc */
export async function netDiskOverviewSpace(options?: RequestOptions) {
  return request<API.OverviewSpaceInfo>('/api/netdisk/overview/desc', {
    method: 'GET',
    ...(options || {}),
  });
}
