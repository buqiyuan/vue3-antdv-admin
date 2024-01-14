// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 下线指定在线用户 POST /api/system/online/kick */
export async function onlineKick(body: API.KickDto, options?: RequestOptions) {
  return request<any>('/api/system/online/kick', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询当前在线用户 GET /api/system/online/list */
export async function onlineList(options?: RequestOptions) {
  return request<API.OnlineUserInfo[]>('/api/system/online/list', {
    method: 'GET',
    ...(options || {}),
  });
}
