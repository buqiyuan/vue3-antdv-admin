import { request } from '@/utils/request';

/**
 * @description Get sample options value
 */
export function optionsListApi(params?: any) {
  return request<{ list: { id: string; name: string }[] }>(
    {
      url: '/select/getDemoOptions',
      method: 'get',
      params,
    },
    {
      isMock: true,
      isGetDataDirectly: true,
    },
  );
}
