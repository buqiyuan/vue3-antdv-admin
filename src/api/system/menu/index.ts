import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/menu';

export function getMenuList() {
  return request<API.MenuListResult>({
    url: Api.list,
    method: 'get',
  });
}

export function getMenuInfo(query: { menuId: number }) {
  return request<API.MenuInfoResult>({
    url: Api.info,
    method: 'get',
    params: query,
  });
}

export function createMenu(data: API.MenuAddParams) {
  return request(
    {
      url: Api.add,
      method: 'post',
      data,
    },
    {
      successMsg: '创建成功',
    },
  );
}

export function updateMenu(data: API.MenuUpdateParams) {
  return request(
    {
      url: Api.update,
      method: 'post',
      data,
    },
    {
      successMsg: '更新成功',
    },
  );
}

export function deleteMenu(data: { menuId: number }) {
  return request(
    {
      url: Api.delete,
      method: 'post',
      data,
    },
    {
      successMsg: '删除成功',
    },
  );
}
