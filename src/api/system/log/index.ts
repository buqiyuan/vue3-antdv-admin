import { request, BaseResponse } from '@/utils/request';
import LogApi from '@/core/permission/modules/sys/log';

export function getReqLogList(query: API.PageParams) {
  return request<BaseResponse<API.TableListResult>>(
    {
      url: LogApi.req,
      method: 'get',
      params: query,
    },
    {
      isMock: true,
      isGetDataDirectly: false,
    },
  );
}

export function getLoginLogList(query: API.PageParams) {
  return request<API.TableListResult<API.LoginLogListResult>>({
    url: LogApi.login,
    method: 'get',
    params: query,
  });
}

export function getTaskLogList(query: API.PageParams) {
  return request<API.TableListResult<API.TaskLogListResult>>({
    url: LogApi.task,
    method: 'get',
    params: query,
  });
}
