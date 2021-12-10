declare namespace API {
  /** 在线用户列表项 */
  type OnlineUserListItem = {
    id: number;
    ip: string;
    username: string;
    isCurrent: true;
    time: string;
    os: string;
    browser: string;
    disable: boolean;
  };
  /** 在线用户列表 */
  type OnlineUserListResult = OnlineUserListItem[];
}
