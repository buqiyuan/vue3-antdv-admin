declare namespace API {
  /** 新增参数配置 */
  type CreateParamConfigParams = {
    name: string;
    key: string;
    value: string;
    remark: string;
  };
  /** 更新参数配置 */
  type UpdateParamConfigParams = {
    id: number;
    name: string;
    value: string;
    remark: string;
  };

  /** 参数配置列表项 */
  type ParamConfigListItem = {
    createdAt: string;
    updatedAt: string;
    id: number;
    key: string;
    name: string;
    value: string;
    remark: string;
  };

  /** 参数配置列表 */
  type ParamConfigListResult = ParamConfigListItem[];

  /** 参数配置详情 */
  type ParamConfigInfoResult = {
    createdAt: string;
    updatedAt: string;
    id: number;
    key: string;
    name: string;
    value: string;
    remark: string;
  };

  /** 删除参数配置 */
  type DeleteParamConfigParams = {
    ids: number[];
  };
}
