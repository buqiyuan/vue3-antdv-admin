// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取任务列表 GET /api/system/tasks */
export async function taskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.TaskEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/tasks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加任务 POST /api/system/tasks */
export async function taskCreate(body: API.TaskDto, options?: RequestOptions) {
  return request<any>('/api/system/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询任务详细信息 GET /api/system/tasks/${param0} */
export async function taskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskInfoParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TaskEntity>(`/api/system/tasks/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新任务 PUT /api/system/tasks/${param0} */
export async function taskUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskUpdateParams,
  body: API.TaskUpdateDto,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/tasks/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除任务 DELETE /api/system/tasks/${param0} */
export async function taskDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskDeleteParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/tasks/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || { successMsg: '删除成功' }),
  });
}

/** 手动执行一次任务 PUT /api/system/tasks/${param0}/once */
export async function taskOnce(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskOnceParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/tasks/${param0}/once`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 启动任务 PUT /api/system/tasks/${param0}/start */
export async function taskStart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskStartParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/tasks/${param0}/start`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 停止任务 PUT /api/system/tasks/${param0}/stop */
export async function taskStop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TaskStopParams,
  options?: RequestOptions,
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/system/tasks/${param0}/stop`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
