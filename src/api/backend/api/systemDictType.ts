// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取字典类型列表 GET /api/system/dict-type */
export async function dictTypeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.DictTypeEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/dict-type', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增字典类型 POST /api/system/dict-type */
export async function dictTypeCreate(body: API.DictTypeDto, options?: RequestOptions) {
  return request<any>('/api/system/dict-type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 查询字典类型信息 GET /api/system/dict-type/${param0} */
export async function dictTypeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DictTypeEntity>(`/api/system/dict-type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新字典类型 POST /api/system/dict-type/${param0} */
export async function dictTypeUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeUpdateParams,
  body: API.DictTypeDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/dict-type/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除指定的字典类型 DELETE /api/system/dict-type/${param0} */
export async function dictTypeDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictTypeDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/dict-type/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}

/** 一次性获取所有的字典类型(不分页) GET /api/system/dict-type/select-options */
export async function dictTypeGetAll(options?: RequestOptions) {
  return request<API.DictTypeEntity[]>('/api/system/dict-type/select-options', {
    method: 'GET',
    ...(options || {}),
  });
}
