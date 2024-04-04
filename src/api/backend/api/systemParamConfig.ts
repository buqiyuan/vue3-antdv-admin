// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取参数配置列表 GET /api/system/param-config */
export async function paramConfigList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ParamConfigListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.ParamConfigEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/param-config', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增参数配置 POST /api/system/param-config */
export async function paramConfigCreate(body: API.ParamConfigDto, options?: RequestOptions) {
  return request<any>('/api/system/param-config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 查询参数配置信息 GET /api/system/param-config/${param0} */
export async function paramConfigInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ParamConfigInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ParamConfigEntity>(`/api/system/param-config/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新参数配置 POST /api/system/param-config/${param0} */
export async function paramConfigUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ParamConfigUpdateParams,
  body: API.ParamConfigDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/param-config/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除指定的参数配置 DELETE /api/system/param-config/${param0} */
export async function paramConfigDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ParamConfigDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/param-config/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}
