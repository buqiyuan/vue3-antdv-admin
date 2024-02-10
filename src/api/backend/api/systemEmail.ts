// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 发送邮件 POST /api/tools/email/send */
export async function emailSend(body: API.EmailSendDto, options?: RequestOptions) {
  return request<any>('/api/tools/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
