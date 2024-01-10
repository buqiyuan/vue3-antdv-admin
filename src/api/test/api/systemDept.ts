// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取部门列表 GET /api/system/depts */
export async function deptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeptListParams,
  options?: { [key: string]: any },
) {
  return request<API.DeptEntity[]>('/api/system/depts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建部门 POST /api/system/depts */
export async function deptCreate(body: API.DeptDto, options?: { [key: string]: any }) {
  return request<any>('/api/system/depts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询部门信息 GET /api/system/depts/${param0} */
export async function deptInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeptInfoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeptEntity>(`/api/system/depts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新部门 PUT /api/system/depts/${param0} */
export async function deptUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeptUpdateParams,
  body: API.DeptDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/depts/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /api/system/depts/${param0} */
export async function deptDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeptDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/depts/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
