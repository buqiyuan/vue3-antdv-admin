// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取Todo列表 GET /api/todos */
export async function todoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoListParams,
  options?: { [key: string]: any },
) {
  return request<API.TodoEntity[]>('/api/todos', {
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

/** 创建Todo POST /api/todos */
export async function todoCreate(body: API.TodoDto, options?: { [key: string]: any }) {
  return request<any>('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取Todo详情 GET /api/todos/${param0} */
export async function todoInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoInfoParams,
  options?: { [key: string]: any },
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
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/todos/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除Todo DELETE /api/todos/${param0} */
export async function todoDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TodoDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/todos/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
