// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 获取登录图片验证码 GET /api/auth/captcha/img */
export async function captchaCaptchaByImg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CaptchaCaptchaByImgParams,
  options?: RequestOptions,
) {
  return request<API.ImageCaptcha>('/api/auth/captcha/img', {
    method: 'GET',
    params: {
      // width has a default value: 100
      width: '100',
      // height has a default value: 50
      height: '50',
      ...params,
    },
    ...(options || {}),
  });
}
