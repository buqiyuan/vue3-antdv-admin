import { request } from '@/utils/request';

export type DictType = 'gender' | 'sell_status';

export async function getDictData(params: { type: DictType }) {
  return request<LabelValueOptions>({
    url: '/dict/data',
    method: 'GET',
    params,
  });
}
