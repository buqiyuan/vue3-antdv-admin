declare namespace API {
  /** 任务列表项 */
  export type SysTaskListItem = {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
  };
  /** 添加任务参数 */
  export type SysTaskAddParams = {
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    remark: string;
  };

  /** 更新任务参数 */
  export type SysTaskUpdateParams = SysTaskAddParams & {
    id: number;
  };
  /** 获取任务详情返回结果 */
  export type SysTaskInfoResult = {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
  };
}
