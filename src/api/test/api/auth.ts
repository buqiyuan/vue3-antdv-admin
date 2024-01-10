// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 登录 POST /api/auth/login */
export async function authLogin(body: API.LoginDto, options?: { [key: string]: any }) {
  return request<API.LoginToken>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 POST /api/auth/register */
export async function authRegister(body: API.RegisterDto, options?: { [key: string]: any }) {
  return request<any>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
