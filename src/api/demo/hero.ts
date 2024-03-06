import { request } from '@/utils/request';

/**
 * @description 获取王者荣耀英雄列表
 */
export function getWzryHeroList(query: API.PageParams) {
  return request({
    url: '/demo/wzry/hero_list',
    method: 'get',
    params: query,
  });
}

/**
 * @description 获取英雄联盟英雄列表
 */
export function getLolHeroList(query: API.PageParams) {
  return request({
    url: '/demo/lol/hero_list',
    method: 'get',
    params: query,
  });
}

/**
 * @description 获取英雄联盟英雄列表
 */
export function getLolHeroInfo({ id }) {
  return request({
    url: `/demo/lol/hero_info/${id}`,
    method: 'get',
  });
}
