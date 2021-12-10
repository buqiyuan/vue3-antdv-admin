import { request } from '@/utils/request';
// import type { BaseResponse } from '@/utils/request';
import Api from '@/core/permission/modules/sys/dept';

/**
 * @description 获取部门列表
 * @returns
 */
export function getDeptList() {
  return request<API.SysDeptListResult[]>({
    url: Api.list,
    method: 'get',
  });
}

/**
 * @description 部门移动排序
 * @param {API.MovedDeptsParams} data
 * @returns
 */
export function moveDeptList(data: API.MovedDeptsParams) {
  return request({
    url: Api.move,
    method: 'post',
    data,
  });
}

/**
 * @description 删除部门
 * @param {API.DelDeptParams} data
 * @returns
 */
export function deleteDept(data: API.DelDeptParams) {
  return request(
    {
      url: 'sys/dept/delete',
      method: 'post',
      data,
    },
    {
      successMsg: '删除成功',
    },
  );
}

/**
 * @description 更新某个部门
 * @param {API.UpdateDeptParams} data 参数
 * @returns
 */
export function updateDept(data: API.UpdateDeptParams) {
  return request({
    url: Api.update,
    method: 'post',
    data,
  });
}

/**
 * @description 创建部门
 * @param {API.CreateDeptParams} data 参数
 * @returns
 */
export function createDept(data: API.CreateDeptParams) {
  return request({
    url: Api.add,
    method: 'post',
    data,
  });
}
/**
 * @description 查询单个部门信息
 * @param query
 * @returns
 */
export function getDeptInfo(query: { departmentId: string | number }) {
  return request<API.GetDeptInfoResult>({
    url: Api.info,
    method: 'get',
    params: query,
  });
}

/**
 * @description 管理员部门转移
 * @param data
 * @returns
 */
export function transferDept(data: API.TransferDeptParams) {
  return request({
    url: Api.transfer,
    method: 'post',
    data,
  });
}
