// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取网盘空间数据统计 GET /api/overview/desc */
export async function netDiskOverviewSpace(options?: RequestOptions) {
  return request<API.OverviewSpaceInfo>('/api/overview/desc', {
    method: 'GET',
    ...(options || {}),
  });
}
