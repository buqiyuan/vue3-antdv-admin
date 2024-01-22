// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取服务器运行信息 GET /api/system/serve/stat */
export async function serveStat(options?: RequestOptions) {
  return request<API.ServeStatInfo>('/api/system/serve/stat', {
    method: 'GET',
    ...(options || {}),
  });
}
