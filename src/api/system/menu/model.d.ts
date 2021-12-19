declare namespace API {
  type MenuListResultItem = {
    createTime: string;
    updatedAt: string;
    id: number;
    parentId: number;
    name: string;
    router: string;
    perms: string;
    type: number;
    icon: string;
    orderNum: number;
    viewPath: string;
    keepalive: boolean;
    isShow: boolean;
    keyPath?: number[];
  };

  /** 获取菜单列表参数 */
  type MenuListResult = MenuListResultItem[];

  /** 新增菜单参数 */
  type MenuAddParams = {
    type: number;
    parentId: number;
    name: string;
    orderNum: number;
    router: string;
    isShow: boolean;
    keepalive: boolean;
    icon: string;
    perms: string;
    viewPath: string;
  };

  /** 更新某项菜单参数 */
  type MenuUpdateParams = MenuAddParams & {
    menuId: number;
  };

  /** 获取菜单详情结果 */
  type MenuInfoResult = {
    menu: {
      createTime: string;
      updateTime: string;
      id: number;
      parentId: number;
      name: string;
      router: string;
      perms: string;
      type: number;
      icon: string;
      orderNum: number;
      viewPath: string;
      keepalive: boolean;
      isShow: boolean;
    };
    parentMenu: {
      createTime: string;
      updateTime: string;
      id: number;
      parentId: number;
      name: string;
      router: string;
      perms: string;
      type: number;
      icon: string;
      orderNum: number;
      viewPath: string;
      keepalive: boolean;
      isShow: boolean;
    };
  };
}
