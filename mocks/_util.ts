// Interface data format used to return a unified format
import type { DefaultBodyType, StrictRequest } from 'msw';
import { ResultEnum } from '@/enums/httpEnum';
import { uniqueSlash } from '@/utils/urlUtils';

const baseApiUrl = new URL(import.meta.env.VITE_BASE_API_URL, location.origin).toString();

/**
 * msw 官方不支持配置 baseUrl, 需要自己手动处理
 * @see https://github.com/mswjs/msw/issues/397#issuecomment-751230924
 */
export const serverApi = (path: string) => {
  return uniqueSlash(baseApiUrl + path);
};

export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: 'success',
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      meta: {
        currentPage: ~~page,
        totalItems: list.length,
        totalPages: Math.ceil(list.length / pageSize),
      },
    }),
    message,
  };
}

export function resultError(
  message = 'Request failed',
  { code = ResultEnum.ERROR, data = null } = {},
) {
  return {
    code,
    data,
    message,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}

export const getQuery = (request: StrictRequest<DefaultBodyType>) => {
  const url = new URL(request.url);
  return Object.fromEntries<any>(url.searchParams.entries());
};
