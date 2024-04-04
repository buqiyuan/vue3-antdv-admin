// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取字典项列表 GET /api/system/dict-item */
export async function dictItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictItemListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.DictItemEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/dict-item', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增字典项 POST /api/system/dict-item */
export async function dictItemCreate(body: API.DictItemDto, options?: RequestOptions) {
  return request<any>('/api/system/dict-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 查询字典项信息 GET /api/system/dict-item/${param0} */
export async function dictItemInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictItemInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DictItemEntity>(`/api/system/dict-item/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新字典项 POST /api/system/dict-item/${param0} */
export async function dictItemUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictItemUpdateParams,
  body: API.DictItemDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/dict-item/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除指定的字典项 DELETE /api/system/dict-item/${param0} */
export async function dictItemDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictItemDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/dict-item/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}
