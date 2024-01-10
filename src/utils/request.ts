import axios, { CanceledError } from 'axios';
import { message as $message, Modal } from 'ant-design-vue';
import type { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';

export interface RequestOptions<Passive extends boolean = true> {
  /** 是否直接获取data，而忽略message等 */
  isGetDataDirectly?: Passive;
  /** 请求成功是提示信息 */
  successMsg?: string;
  /** 请求失败是提示信息 */
  errorMsg?: string;
  requestType?: 'json' | 'form';
}

const UNKNOWN_ERROR = '未知错误，请重试';

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API;
/** mock请求路径前缀 */
// const baseMockUrl = import.meta.env.VITE_MOCK_API;

const controller = new AbortController();
const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 6000,
  signal: controller.signal,
});

service.interceptors.request.use(
  (config) => {
    const token = Storage.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      $message.error(res.message || UNKNOWN_ERROR);

      // Illegal token
      if ([11001, 11002].includes(res.code)) {
        // 取消后续所有请求
        controller.abort();
        // window.localStorage.clear();
        // window.location.reload();
        // to re-login
        Modal.confirm({
          title: '警告',
          content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
          okText: '重新登录',
          cancelText: '取消',
          onOk: () => {
            localStorage.clear();
            window.location.reload();
          },
        });
      }

      // throw other
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  (error) => {
    if (!(error instanceof CanceledError)) {
      // 处理 422 或者 500 的错误异常提示
      const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
      $message.error({ content: errMsg, key: errMsg });
      error.message = errMsg;
    }
    return Promise.reject(error);
  },
);

type BaseResponse<T = any> = Omit<API.ResOp, 'data'> & {
  data: T;
};

export function request<T = any>(
  url: string,
  config: AxiosRequestConfig & RequestOptions<true>,
): Promise<BaseResponse<T>['data']>;

export function request<T = any>(
  url: string,
  config: AxiosRequestConfig & RequestOptions<false>,
): Promise<BaseResponse<T>>;
/**
 *
 * @param url - request url
 * @param config - AxiosRequestConfig
 */
export async function request<T extends object, Passive extends boolean>(
  url: string,
  config: AxiosRequestConfig & RequestOptions<Passive> = {},
) {
  try {
    // 兼容 from data 文件上传的情况
    const { requestType, isGetDataDirectly = true, ...rest } = config;

    const res = await service.request<T>({
      url,
      ...rest,
      headers: {
        ...rest.headers,
        ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {}),
      },
    });

    if (isGetDataDirectly) {
      return res.data;
    } else {
      return res;
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
}
