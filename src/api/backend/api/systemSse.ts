// @ts-ignore
/* eslint-disable */

/**
 * 该文件为 @umijs/openapi 插件自动生成，请勿随意修改。如需修改请通过配置 openapi.config.ts 进行定制化。
 * */

import { request, type RequestOptions } from '@/utils/request';

/** 服务端推送消息 GET /api/sse/${param0} */
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
