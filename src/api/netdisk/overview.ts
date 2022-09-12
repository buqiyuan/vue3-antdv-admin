import { request } from '@/utils/request';

export function getNetdiskDesc() {
  return request({
    url: 'netdisk/overview/desc',
    method: 'get',
  });
}
