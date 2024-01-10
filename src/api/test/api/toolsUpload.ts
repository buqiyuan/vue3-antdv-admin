// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 上传 POST /api/upload */
export async function uploadUpload(options?: { [key: string]: any }) {
  return request<any>('/api/upload', {
    method: 'POST',
    ...(options || {}),
  });
}
