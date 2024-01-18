import { request } from '@/utils/request';

interface DemoOptionsItem {
  name: string;
  id: string;
}

export async function optionsListApi(params?: Recordable) {
  return request<DemoOptionsItem[]>('/api/select/getDemoOptions', {
    method: 'GET',
    params,
  });
}
