declare namespace API {
  /** 登录日志项结果 */
  type LoginLogListItemResult = {
    id: number;
    ip: string;
    os: string;
    browser: string;
    time: string;
    username: string;
  };
  /** 登录日志结果 */
  type LoginLogListResult = LoginLogListItemResult[];

  /** 请求日志项结果 */
  type ReqLogListItemResult = {
    createTime: string;
    updateTime: string;
    id: number;
    ip: string;
    userId: number;
    params: string;
    action: string;
    method: string;
    status: number;
    consumeTime: number;
  };
  /** 请求日志结果 */
  type ReqLogListResult = ReqLogListItemResult[];

  /** 任务日志项结果 */
  type TaskLogListItemResult = {
    id: number;
    taskId: number;
    name: string;
    createdAt: string;
    consumeTime: number;
    detail: string;
    status: number;
  };
  /** 任务日志结果 */
  type TaskLogListResult = TaskLogListItemResult[];
}
