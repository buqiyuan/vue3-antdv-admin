// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 查询验证码日志列表 GET /api/system/log/captcha/list */
export async function logCaptchaList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogCaptchaListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.CaptchaLogEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/log/captcha/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询登录日志列表 GET /api/system/log/login/list */
export async function logLoginLogPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogLoginLogPageParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.LoginLogInfo[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/log/login/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询任务日志列表 GET /api/system/log/task/list */
export async function logTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LogTaskListParams,
  options?: RequestOptions,
) {
  return request<{
    items?: API.TaskLogEntity[];
    meta?: {
      itemCount?: number;
      totalItems?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  }>('/api/system/log/task/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
