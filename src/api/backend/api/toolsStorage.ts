// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 删除文件 POST /api/storage/delete */
export async function storageDelete(body: API.StorageDeleteDto, options?: RequestOptions) {
  return request<any>('/api/storage/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '删除成功' }),
  });
}

/** 获取本地存储列表 GET /api/storage/list */
export async function storageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.StorageListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.StorageInfo[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/storage/list', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',

      ...params,
    },
    ...(options || {}),
  });
}
