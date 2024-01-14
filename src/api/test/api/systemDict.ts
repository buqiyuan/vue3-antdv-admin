// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取字典配置列表 GET /api/dicts */
export async function dictList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictListParams,
  options?: RequestOptions,
) {
  return request<API.DictEntity[]>('/api/dicts', {
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

/** 新增字典配置 POST /api/dicts */
export async function dictCreate(body: API.DictDto, options?: RequestOptions) {
  return request<any>('/api/dicts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询字典配置信息 GET /api/dicts/${param0} */
export async function dictInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DictEntity>(`/api/dicts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新字典配置 POST /api/dicts/${param0} */
export async function dictUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictUpdateParams,
  body: API.DictDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/dicts/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定的字典配置 DELETE /api/dicts/${param0} */
export async function dictDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/dicts/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
