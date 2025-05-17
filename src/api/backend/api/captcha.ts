// @ts-ignore
/* eslint-disable */

/**
 * 该文件为 @umijs/openapi 插件自动生成，请勿随意修改。如需修改请通过配置 openapi.config.ts 进行定制化。
 * */

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
      ...params,
    },
    ...(options || {}),
  });
}
