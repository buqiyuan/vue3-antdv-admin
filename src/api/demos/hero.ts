import { request, BaseResponse } from '@/utils/request';

/**
 * @description 获取王者荣耀英雄列表
 */
export function getWzryHeroList(query: API.PageParams) {
  return request<BaseResponse<API.TableListResult>>(
    {
      url: '/demos/wzry/hero_list',
      method: 'get',
      params: query,
    },
    {
      isMock: true,
      isGetDataDirectly: false,
    },
  );
}

/**
 * @description 获取英雄联盟英雄列表
 */
export function getLolHeroList(query: API.PageParams) {
  return request<BaseResponse<API.TableListResult>>(
    {
      url: '/demos/lol/hero_list',
      method: 'get',
      params: query,
    },
    {
      isMock: true,
      isGetDataDirectly: false,
    },
  );
}

/**
 * @description 获取英雄联盟英雄列表
 */
export function getLolHeroInfo(query: { id: number | string }) {
  return request<BaseResponse>(
    {
      url: '/demos/lol/hero_info',
      method: 'get',
      params: query,
    },
    {
      isMock: true,
      isGetDataDirectly: false,
    },
  );
}
