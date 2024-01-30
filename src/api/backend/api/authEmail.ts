// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 发送邮箱验证码 POST /api/auth/email/send */
export async function emailSendEmailCode(body: API.SendEmailCodeDto, options?: RequestOptions) {
  return request<any>('/api/auth/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
