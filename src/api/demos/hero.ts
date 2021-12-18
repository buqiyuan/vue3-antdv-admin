import { request, BaseResponse } from '@/utils/request';

export function getHeroList(query: API.PageParams) {
  return request<BaseResponse<API.TableListResult>>(
    {
      url: '/demos/hero/list',
      method: 'get',
      params: query,
    },
    {
      isMock: true,
      isGetDataDirectly: false,
    },
  );
}
