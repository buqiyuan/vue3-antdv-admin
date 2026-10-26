import axios, {
  AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
  CanceledError,
} from "axios";
import qs from "qs";
import { toast } from "vue-sonner";
import { getToken, notifyAuthExpired } from "@/auth/token";

export interface RequestOptions extends AxiosRequestConfig {
  isReturnResult?: boolean;
  successMsg?: string;
  errorMsg?: string;
  showSuccessMsg?: boolean;
  showErrorMsg?: boolean;
  requestType?: "json" | "form";
}

interface ApiEnvelope<T> {
  code: number;
  message?: string;
  data: T;
}

const UNKNOWN_ERROR = "未知错误，请重试";
const AUTH_INVALID = new Set([1101, 1105]);

export const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 15000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
});

service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

service.interceptors.response.use(
  (response: AxiosResponse<ApiEnvelope<unknown>>) => {
    const body = response.data;
    if (body && typeof body === "object" && "code" in body && body.code !== 200) {
      const message = body.message || UNKNOWN_ERROR;
      const options = response.config as RequestOptions;
      if (AUTH_INVALID.has(body.code)) notifyAuthExpired();
      if (options.showErrorMsg !== false) toast.error(message);
      const error = new Error(message) as Error & { code?: number };
      error.code = body.code;
      return Promise.reject(error);
    }
    return response;
  },
  (error: unknown) => {
    if (error instanceof CanceledError) return Promise.reject(error);
    const response = axios.isAxiosError(error) ? error.response : undefined;
    const message =
      (response?.data as { message?: string } | undefined)?.message ||
      (error instanceof Error ? error.message : UNKNOWN_ERROR);
    const options = axios.isAxiosError(error)
      ? (error.config as RequestOptions | undefined)
      : undefined;
    if (options?.showErrorMsg !== false) toast.error(message);
    if (error instanceof Error) error.message = message;
    return Promise.reject(error instanceof Error ? error : new Error(message));
  },
);

export function request<T = unknown>(url: string, config?: RequestOptions): Promise<T>;
export function request<T = unknown>(config: RequestOptions): Promise<T>;
export async function request<T = unknown>(
  url: string | RequestOptions,
  config: RequestOptions = {},
): Promise<T> {
  const resolvedUrl = typeof url === "string" ? url : url.url;
  const resolved = typeof url === "string" ? config : url;
  const { requestType, isReturnResult = true, successMsg, showSuccessMsg, ...rest } = resolved;

  const headers =
    requestType === "form"
      ? AxiosHeaders.concat(rest.headers as AxiosHeaders | undefined, {
          "Content-Type": "multipart/form-data",
        })
      : rest.headers;

  const response = await service.request<ApiEnvelope<T>>({
    url: resolvedUrl,
    ...rest,
    headers,
  });
  const body = response.data;
  if (successMsg) toast.success(successMsg);
  else if (showSuccessMsg && body?.message) toast.success(body.message);

  if (!isReturnResult) return body as T;
  return body.data;
}
