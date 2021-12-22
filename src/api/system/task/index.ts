import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/task';

type CommonParams = {
  id: number;
};

export function getSysTaskList(params?: API.PageParams) {
  return request<API.TableListResult<API.SysTaskListItem[]>>({
    url: Api.page,
    method: 'get',
    params,
  });
}

export function getSysTaskInfo(params: CommonParams) {
  return request<API.SysTaskInfoResult>({
    url: Api.info,
    method: 'get',
    params,
  });
}

export function sysTaskAdd(data?: API.PageParams) {
  return request(
    {
      url: Api.add,
      method: 'post',
      data,
    },
    {
      successMsg: '添加成功',
    },
  );
}

export function sysTaskDelete(data?: API.PageParams) {
  return request({
    url: Api.delete,
    method: 'post',
    data,
  });
}

export function sysTaskUpdate(data?: API.PageParams) {
  return request(
    {
      url: Api.update,
      method: 'post',
      data,
    },
    {
      successMsg: '修改成功',
    },
  );
}

export function sysTaskOnce(data: CommonParams) {
  return request({
    url: Api.once,
    method: 'post',
    data,
  });
}

export function sysTaskStart(data: CommonParams) {
  return request({
    url: Api.start,
    method: 'post',
    data,
  });
}

export function sysTaskStop(data: CommonParams) {
  return request({
    url: Api.stop,
    method: 'post',
    data,
  });
}
