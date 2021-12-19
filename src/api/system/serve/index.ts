import { request } from '@/utils/request';
import ServeApi from '@/core/permission/modules/sys/serve';

export function getServeStat() {
  return request<API.SysServeStat>({
    url: ServeApi.stat,
    method: 'get',
  });
}
