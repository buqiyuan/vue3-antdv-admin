import { request } from '@/utils/request';

interface DemoOptionsItem {
  name: string;
  id: string;
}

export async function optionsListApi(params?: Recordable) {
  return request<DemoOptionsItem[]>('/mock-api/select/getDemoOptions', {
    method: 'GET',
    params,
  });
}
