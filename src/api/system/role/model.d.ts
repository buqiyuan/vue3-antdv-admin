declare namespace API {
  /** 新增角色 */
  type CreateRoleParams = {
    name: string;
    label: string;
    remark: string;
    menus: Key[];
    depts: number[];
  };
  /** 更新角色 */
  type UpdateRoleParams = CreateRoleParams & {
    roleId: number;
  };

  /** 角色列表项 */
  type RoleListResultItem = {
    createdAt: string;
    updatedAt: string;
    id: number;
    userId: string;
    name: string;
    label: string;
    remark: string;
  };

  /** 角色列表 */
  type RoleListResult = RoleListResultItem[];

  /** 角色详情 */
  type RoleInfoResult = {
    roleInfo: {
      createTime: string;
      updateTime: string;
      id: number;
      userId: string;
      name: string;
      label: string;
      remark: string;
    };
    menus: {
      createTime: string;
      updateTime: string;
      id: number;
      roleId: number;
      menuId: number;
    }[];
    depts: {
      createTime: string;
      updateTime: string;
      id: number;
      roleId: number;
      departmentId: number;
    }[];
  };
}
