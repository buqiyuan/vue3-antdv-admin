// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取Todo列表 GET /api/todos */
export async function todoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoListParams,
  options?: RequestOptions,
) {
  return request<API.TodoEntity[]>('/api/todos', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建Todo POST /api/todos */
export async function todoCreate(body: API.TodoDto, options?: RequestOptions) {
  return request<any>('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 获取Todo详情 GET /api/todos/${param0} */
export async function todoInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TodoEntity>(`/api/todos/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新Todo PUT /api/todos/${param0} */
export async function todoUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoUpdateParams,
  body: API.TodoUpdateDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/todos/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除Todo DELETE /api/todos/${param0} */
export async function todoDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/todos/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}
