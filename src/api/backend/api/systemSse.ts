// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 此处后端没有提供注释 GET /api/sse/${param0} */
export async function sseSse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SseSseParams,
  options?: RequestOptions,
) {
  const { uid: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/sse/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
