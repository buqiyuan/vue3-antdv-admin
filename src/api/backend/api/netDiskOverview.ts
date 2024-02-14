// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取网盘空间数据统计 GET /api/netdisk/overview/desc */
export async function netDiskOverviewSpace(options?: RequestOptions) {
  return request<API.OverviewSpaceInfo>('/api/netdisk/overview/desc', {
    method: 'GET',
    ...(options || {}),
  });
}
