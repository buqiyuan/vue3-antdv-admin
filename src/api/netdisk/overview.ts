import { request } from '@/utils/request';

export function getNetdiskDesc() {
  return request<API.OverviewSpaceInfo>({
    url: 'netdisk/overview/desc',
    method: 'get',
  });
}
