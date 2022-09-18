import { request } from '@/utils/request';
// import type { BaseResponse } from '@/utils/request';
import Api from '@/core/permission/modules/sys/param-config';

export function getParamConfigInfo(params: { id: number }) {
  return request<API.ParamConfigInfoResult>({
    url: Api.info,
    method: 'get',
    params,
  });
}

export function getParamConfigList(params: API.PageParams) {
  return request({
    url: Api.page,
    method: 'get',
    params,
  });
}

export function createParamConfig(data: API.CreateParamConfigParams) {
  return request(
    {
      url: Api.add,
      method: 'post',
      data,
    },
    {
      successMsg: '添加参数成功',
    },
  );
}

export function updateParamConfig(data: API.UpdateParamConfigParams) {
  return request(
    {
      url: Api.update,
      method: 'post',
      data,
    },
    {
      successMsg: '更新参数配置成功',
    },
  );
}

export function deleteParamConfig(data: API.DeleteParamConfigParams) {
  return request(
    {
      url: Api.delete,
      method: 'post',
      data,
    },
    {
      successMsg: '删除参数配置成功',
    },
  );
}
