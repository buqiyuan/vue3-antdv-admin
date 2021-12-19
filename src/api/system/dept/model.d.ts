declare namespace API {
  /** 获取系统部门返回结果 */
  type SysDeptListResult = {
    createTime: string;
    updateTime: string;
    id: number;
    parentId: number;
    name: string;
    orderNum: number;
    keyPath?: number[];
  };
  /** 部门 */
  type MovedDeptItem = {
    id: number;
    parentId: number;
  };

  /** 要排序的部门 */
  type MovedDeptsParams = {
    depts: MovedDeptItem[];
  };

  /** 删除部门的参数 */
  type DelDeptParams = {
    departmentId: number | string;
  };

  /** 更新某个部门需要传的参数 */
  type UpdateDeptParams = {
    name: string;
    parentId: number | string;
    orderNum: number;
    id: number | string;
  };

  /** 创建部门参数 */
  type CreateDeptParams = {
    name: string;
    parentId: number;
    orderNum: number;
  };

  /** 管理员部门转移 */
  type TransferDeptParams = {
    userIds: number[];
    departmentId: number;
  };

  /** 部门详情 */
  type GetDeptInfoResult = {
    department: {
      createTime: string;
      updateTime: string;
      id: number;
      parentId: number;
      name: 'string';
      orderNum: number;
    };
    parentDepartment: {
      createTime: string;
      updateTime: string;
      id: number;
      parentId: number;
      name: 'string';
      orderNum: number;
    };
  };
}
