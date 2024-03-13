declare namespace API {
  type AccessTokenEntity = {
    id: string;
    value: string;
    expired_at: string;
    created_at: string;
    refreshToken: RefreshTokenEntity;
    user: UserEntity;
  };

  type AccountInfo = {
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    phone: string;
    /** 备注 */
    remark: string;
    /** 头像 */
    avatar: string;
  };

  type AccountMenus = {
    meta: MenuMeta;
    id: number;
    path: string;
    name: string;
    component: string;
  };

  type AccountUpdateDto = {
    /** 用户呢称 */
    nickname: string;
    /** 用户邮箱 */
    email: string;
    /** 用户QQ */
    qq: string;
    /** 用户手机号 */
    phone: string;
    /** 用户头像 */
    avatar: string;
    /** 用户备注 */
    remark: string;
  };

  type CaptchaCaptchaByImgParams = {
    /** 验证码宽度 */
    width?: number;
    /** 验证码宽度 */
    height?: number;
  };

  type CaptchaLogEntity = {
    /** 用户ID */
    userId: number;
    /** 账号 */
    account: string;
    /** 验证码 */
    code: string;
    /** 验证码提供方 */
    provider: Record<string, any>;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type CommonEntity = {
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type CoreLoad = {
    /** 当前CPU资源消耗 */
    rawLoad: number;
    /** 当前空闲CPU资源 */
    rawLoadIdle: number;
  };

  type Cpu = {
    /** 制造商 */
    manufacturer: string;
    /** 品牌 */
    brand: string;
    /** 物理核心数 */
    physicalCores: number;
    /** 型号 */
    model: string;
    /** 速度 in GHz */
    speed: number;
    /** CPU资源消耗 原始滴答 */
    rawCurrentLoad: number;
    /** 空闲CPU资源 原始滴答 */
    rawCurrentLoadIdle: number;
    /** cpu资源消耗 */
    coresLoad: CoreLoad[];
  };

  type DeleteDto = {
    /** 需要操作的文件或文件夹 */
    files: FileOpItem[];
    /** 所在目录 */
    path: string;
  };

  type DeptDeleteParams = {
    id: number;
  };

  type DeptDto = {
    /** 部门名称 */
    name: string;
    /** 父级部门id */
    parentId: number;
    /** 排序编号 */
    orderNo?: number;
  };

  type DeptEntity = {
    /** 部门名称 */
    name: string;
    /** 排序 */
    orderNo: number;
    children: DeptEntity[];
    parent?: DeptEntity;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type DeptInfoParams = {
    id: number;
  };

  type DeptListParams = {
    /** 部门名称 */
    name?: string;
  };

  type DeptUpdateParams = {
    id: number;
  };

  type DictItemDeleteParams = {
    id: number;
  };

  type DictItemDto = {
    /** 创建者 */
    creator?: string;
    /** 更新者 */
    updater?: string;
    /** 字典项键名 */
    label?: string;
    /** 字典项值 */
    value?: string;
    /** 状态 */
    status?: number;
    /** 备注 */
    remark?: string;
    /** 字典类型 ID */
    typeId: number;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    type?: DictTypeEntity;
    orderNo?: number;
  };

  type DictItemEntity = {
    /** 创建者 */
    creator: string;
    /** 更新者 */
    updater: string;
    /** 字典项键名 */
    label: string;
    /** 字典项值 */
    value: string;
    /**  状态 */
    status: number;
    /** 备注 */
    remark: string;
    type: DictTypeEntity;
    orderNo: number;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type DictItemInfoParams = {
    id: number;
  };

  type DictItemListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 字典类型 ID */
    typeId: number;
    /** 字典项键名 */
    label?: string;
    /** 字典项值 */
    value?: string;
    _t?: number;
  };

  type DictItemUpdateParams = {
    id: number;
  };

  type DictTypeDeleteParams = {
    id: number;
  };

  type DictTypeDto = {
    /** 创建者 */
    creator?: string;
    /** 更新者 */
    updater?: string;
    /** 字典类型名称 */
    name?: string;
    /** 字典类型code */
    code?: string;
    /** 状态 */
    status?: number;
    /** 备注 */
    remark?: string;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type DictTypeEntity = {
    /** 创建者 */
    creator: string;
    /** 更新者 */
    updater: string;
    /** 字典名称 */
    name: string;
    /** 字典类型 */
    code: string;
    /**  状态 */
    status: number;
    /** 备注 */
    remark: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type DictTypeInfoParams = {
    id: number;
  };

  type DictTypeListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 字典类型名称 */
    name: string;
    /** 字典类型code */
    code: string;
    _t?: number;
  };

  type DictTypeUpdateParams = {
    id: number;
  };

  type Disk = {
    /** 磁盘空间大小 (bytes) */
    size: number;
    /** 已使用磁盘空间 (bytes) */
    used: number;
    /** 可用磁盘空间 (bytes) */
    available: number;
  };

  type EmailSendDto = {
    /** 收件人邮箱 */
    to: string;
    /** 标题 */
    subject: string;
    /** 正文 */
    content: string;
  };

  type FileOpDto = {
    /** 需要操作的文件或文件夹 */
    files: FileOpItem[];
    /** 操作前的目录 */
    originPath: string;
    /** 操作后的目录 */
    toPath: string;
  };

  type FileOpItem = {
    /** 文件类型 */
    type: 'file' | 'dir';
    /** 文件名称 */
    name: string;
  };

  type FileUploadDto = {
    /** 文件 */
    file: Record<string, any>;
  };

  type FlowInfo = {
    /** 当月的X号 */
    times: number[];
    /** 对应天数的耗费流量 */
    datas: number[];
  };

  type ImageCaptcha = {
    /** base64格式的svg图片 */
    img: string;
    /** 验证码对应的唯一ID */
    id: string;
  };

  type KickDto = {
    /** tokenId */
    tokenId: string;
  };

  type LogCaptchaListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 用户名 */
    username: string;
    /** 验证码 */
    code?: string;
    /** 发送时间 */
    time?: string[];
    _t?: number;
  };

  type LoginDto = {
    /** 手机号/邮箱 */
    username: string;
    /** 密码 */
    password: string;
    /** 验证码标识 */
    captchaId: string;
    /** 用户输入的验证码 */
    verifyCode: string;
  };

  type LoginLogInfo = {
    /** 日志编号 */
    id: number;
    /** 登录ip */
    ip: string;
    /** 登录地址 */
    address: string;
    /** 系统 */
    os: string;
    /** 浏览器 */
    browser: string;
    /** 登录用户名 */
    username: string;
    /** 登录时间 */
    time: string;
  };

  type LoginToken = {
    /** JWT身份Token */
    token: string;
  };

  type LogLoginLogPageParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 用户名 */
    username: string;
    /** 登录IP */
    ip?: string;
    /** 登录地点 */
    address?: string;
    /** 登录时间 */
    time?: string[];
    _t?: number;
  };

  type LogTaskListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 用户名 */
    username: string;
    /** 登录IP */
    ip?: string;
    /** 登录时间 */
    time?: string[];
    _t?: number;
  };

  type MarkFileDto = {
    /** 文件名 */
    name: string;
    /** 文件所在路径 */
    path: string;
    /** 备注信息 */
    mark: string;
  };

  type Memory = {
    /** total memory in bytes */
    total: number;
    /** 可用内存 */
    available: number;
  };

  type MenuDeleteParams = {
    id: number;
  };

  type MenuDto = {
    /** 菜单类型 */
    type: 0 | 1 | 2;
    /** 父级菜单 */
    parentId: number;
    /** 菜单或权限名称 */
    name: string;
    /** 排序 */
    orderNo: number;
    /** 前端路由地址 */
    path: string;
    /** 是否外链 */
    isExt: boolean;
    /** 外链打开方式 */
    extOpenMode: 1 | 2;
    /** 菜单是否显示 */
    show: 0 | 1;
    /** 设置当前路由高亮的菜单项，一般用于详情页 */
    activeMenu?: string;
    /** 是否开启页面缓存 */
    keepAlive: 0 | 1;
    /** 状态 */
    status: 0 | 1;
    /** 菜单图标 */
    icon?: string;
    /** 对应权限 */
    permission: string;
    /** 菜单路由路径或外链 */
    component?: string;
  };

  type MenuEntity = {
    parentId: number;
    name: string;
    path: string;
    permission: string;
    type: number;
    icon: string;
    orderNo: number;
    component: string;
    isExt: boolean;
    extOpenMode: number;
    keepAlive: number;
    show: number;
    activeMenu: string;
    status: number;
    roles: RoleEntity[];
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type MenuInfoParams = {
    id: number;
  };

  type MenuItemInfo = {
    children: MenuItemInfo[];
    parentId: number;
    name: string;
    path: string;
    permission: string;
    type: number;
    icon: string;
    orderNo: number;
    component: string;
    isExt: boolean;
    extOpenMode: number;
    keepAlive: number;
    show: number;
    activeMenu: string;
    status: number;
    roles: RoleEntity[];
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type MenuListParams = {
    /** 菜单类型 */
    type?: 0 | 1 | 2;
    /** 父级菜单 */
    parentId?: number;
    /** 菜单或权限名称 */
    name?: string;
    /** 排序 */
    orderNo?: number;
    /** 前端路由地址 */
    path?: string;
    /** 是否外链 */
    isExt?: boolean;
    /** 外链打开方式 */
    extOpenMode?: 1 | 2;
    /** 菜单是否显示 */
    show?: 0 | 1;
    /** 设置当前路由高亮的菜单项，一般用于详情页 */
    activeMenu?: string;
    /** 是否开启页面缓存 */
    keepAlive?: 0 | 1;
    /** 状态 */
    status?: 0 | 1;
    /** 菜单图标 */
    icon?: string;
    /** 对应权限 */
    permission?: string;
    /** 菜单路由路径或外链 */
    component?: string;
  };

  type MenuMeta = {
    title: string;
    permission?: string;
    type?: number;
    icon?: string;
    orderNo?: number;
    component?: string;
    isExt?: boolean;
    extOpenMode?: number;
    keepAlive?: number;
    show?: number;
    activeMenu?: string;
    status?: number;
  };

  type MenuUpdateDto = {
    /** 菜单类型 */
    type?: 0 | 1 | 2;
    /** 父级菜单 */
    parentId?: number;
    /** 菜单或权限名称 */
    name?: string;
    /** 排序 */
    orderNo?: number;
    /** 前端路由地址 */
    path?: string;
    /** 是否外链 */
    isExt?: boolean;
    /** 外链打开方式 */
    extOpenMode?: 1 | 2;
    /** 菜单是否显示 */
    show?: 0 | 1;
    /** 设置当前路由高亮的菜单项，一般用于详情页 */
    activeMenu?: string;
    /** 是否开启页面缓存 */
    keepAlive?: 0 | 1;
    /** 状态 */
    status?: 0 | 1;
    /** 菜单图标 */
    icon?: string;
    /** 对应权限 */
    permission?: string;
    /** 菜单路由路径或外链 */
    component?: string;
  };

  type MenuUpdateParams = {
    id: number;
  };

  type MKDirDto = {
    /** 文件夹名称 */
    dirName: string;
    /** 所属路径 */
    path: string;
  };

  type NetDiskManageDownloadParams = {
    /** 文件名 */
    name: string;
    /** 文件所在路径 */
    path: string;
  };

  type NetDiskManageInfoParams = {
    /** 文件名 */
    name: string;
    /** 文件所在路径 */
    path: string;
  };

  type NetDiskManageListParams = {
    /** 分页标识 */
    marker: string;
    /** 当前路径 */
    path: string;
    /** 搜索关键字 */
    key?: string;
  };

  type OnlineUserInfo = {
    /** 登录ip */
    ip: string;
    /** 登录地址 */
    address: string;
    /** 系统 */
    os: string;
    /** 浏览器 */
    browser: string;
    /** 登录用户名 */
    username: string;
    /** 登录时间 */
    time: string;
    /** tokenId */
    tokenId: string;
    /** 部门名称 */
    deptName: string;
    /** 用户ID */
    uid: number;
    /** 是否为当前登录用户 */
    isCurrent: boolean;
    /** 不允许踢当前用户或超级管理员下线 */
    disable: boolean;
  };

  type OverviewSpaceInfo = {
    /** 当前使用容量 */
    spaceSize: number;
    /** 当前文件数量 */
    fileSize: number;
    /** 当天使用流量 */
    flowSize: number;
    /** 当天请求次数 */
    hitSize: number;
    /** 流量趋势，从当月1号开始计算 */
    flowTrend: FlowInfo;
    /** 容量趋势，从当月1号开始计算 */
    sizeTrend: SpaceInfo;
  };

  type Pagination = {};

  type ParamConfigDeleteParams = {
    id: number;
  };

  type ParamConfigDto = {
    /** 参数名称 */
    name: string;
    /** 参数键名 */
    key: string;
    /** 参数值 */
    value: string;
    /** 备注 */
    remark?: string;
  };

  type ParamConfigEntity = {
    /** 配置名 */
    name: string;
    /** 配置键名 */
    key: string;
    /** 配置值 */
    value: string;
    /** 配置描述 */
    remark: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type ParamConfigInfoParams = {
    id: number;
  };

  type ParamConfigListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 参数名称 */
    name: string;
    _t?: number;
  };

  type ParamConfigUpdateParams = {
    id: number;
  };

  type PasswordUpdateDto = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type RefreshTokenEntity = {
    id: string;
    value: string;
    expired_at: string;
    created_at: string;
    accessToken: AccessTokenEntity;
  };

  type RegisterDto = {
    /** 账号 */
    username: string;
    /** 密码 */
    password: string;
    /** 语言 */
    lang: string;
  };

  type RenameDto = {
    /** 文件类型 */
    type: string;
    /** 更改的名称 */
    toName: string;
    /** 原来的名称 */
    name: string;
    /** 路径 */
    path: string;
  };

  type ResOp = {
    data: Record<string, any>;
    code: number;
    message: string;
  };

  type RoleDeleteParams = {
    id: number;
  };

  type RoleDto = {
    /** 角色名称 */
    name: string;
    /** 角色值 */
    value: string;
    /** 角色备注 */
    remark?: string;
    /** 状态 */
    status: 0 | 1;
    /** 关联菜单、权限编号 */
    menuIds?: number[];
  };

  type RoleEntity = {
    /** 角色名 */
    name: string;
    /** 角色标识 */
    value: string;
    /** 角色描述 */
    remark: string;
    /** 状态：1启用，0禁用 */
    status: number;
    /** 是否默认用户 */
    default: boolean;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type RoleInfo = {
    /** 角色名 */
    name: string;
    /** 角色标识 */
    value: string;
    /** 角色描述 */
    remark: string;
    /** 状态：1启用，0禁用 */
    status: number;
    /** 是否默认用户 */
    default: boolean;
    menuIds: number[];
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type RoleInfoParams = {
    id: number;
  };

  type RoleListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    _t?: number;
  };

  type RoleUpdateDto = {
    /** 角色名称 */
    name?: string;
    /** 角色值 */
    value?: string;
    /** 角色备注 */
    remark?: string;
    /** 状态 */
    status?: 0 | 1;
    /** 关联菜单、权限编号 */
    menuIds?: number[];
  };

  type RoleUpdateParams = {
    id: number;
  };

  type Runtime = {
    /** 系统 */
    os: string;
    /** 服务器架构 */
    arch: string;
    /** Node版本 */
    nodeVersion: string;
    /** Npm版本 */
    npmVersion: string;
  };

  type SendEmailCodeDto = {
    /** 邮箱 */
    email: string;
  };

  type ServeStatInfo = {
    /** 运行环境 */
    runtime: Runtime;
    /** CPU信息 */
    cpu: Cpu;
    /** 磁盘信息 */
    disk: Disk;
    /** 内存信息 */
    memory: Memory;
  };

  type SFileInfo = {
    /** 文件id */
    id: string;
    /** 文件类型 */
    type: 'file' | 'dir';
    /** 文件名称 */
    name: string;
    /** 存入时间 */
    putTime: string;
    /** 文件大小, byte单位 */
    fsize: string;
    /** 文件的mime-type */
    mimeType: string;
    /** 所属目录 */
    belongTo: string;
  };

  type SFileInfoDetail = {
    /** 文件大小，int64类型，单位为字节（Byte） */
    fsize: number;
    /** 文件HASH值 */
    hash: string;
    /** 文件MIME类型，string类型 */
    mimeType: string;
    /** 文件存储类型，2 表示归档存储，1 表示低频存储，0表示普通存储。 */
    type: number;
    /** 文件上传时间 */
    putTime: string;
    /** 文件md5值 */
    md5: string;
    /** 上传人 */
    uploader: string;
    /** 文件备注 */
    mark: string;
  };

  type SFileList = {
    /** 文件列表 */
    list: SFileInfo[];
    /** 分页标志，空则代表加载完毕 */
    marker: string;
  };

  type SpaceInfo = {
    /** 当月的X号 */
    times: number[];
    /** 对应天数的容量, byte单位 */
    datas: number[];
  };

  type SseSseParams = {
    uid: number;
  };

  type StorageDeleteDto = {
    /** 需要删除的文件ID列表 */
    ids: number[];
  };

  type StorageInfo = {
    /** 文件ID */
    id: number;
    /** 文件名 */
    name: string;
    /** 文件扩展名 */
    extName: string;
    /** 文件路径 */
    path: string;
    /** 文件类型 */
    type: string;
    /** 大小 */
    size: string;
    /** 上传时间 */
    createdAt: string;
    /** 上传者 */
    username: string;
  };

  type StorageListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 文件名 */
    name: string;
    /** 文件后缀 */
    extName: string;
    /** 文件类型 */
    type: string;
    /** 大小 */
    size: string;
    /** 上传时间 */
    time: string[];
    /** 上传者 */
    username: string;
    _t?: number;
  };

  type String = {};

  type TaskDeleteParams = {
    id: number;
  };

  type TaskDto = {
    /** 任务名称 */
    name: string;
    /** 调用的服务 */
    service: string;
    /** 任务类别：cron | interval */
    type: 0 | 1;
    /** 任务状态 */
    status: 0 | 1;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 限制执行次数，负数则无限制 */
    limit?: number;
    /** cron表达式 */
    cron: string;
    /** 执行间隔，毫秒单位 */
    every?: number;
    /** 执行参数 */
    data?: string;
    /** 任务备注 */
    remark?: string;
  };

  type TaskEntity = {
    /** 任务名 */
    name: string;
    /** 任务标识 */
    service: string;
    /** 任务类型 0cron 1间隔 */
    type: number;
    /** 任务状态 0禁用 1启用 */
    status: number;
    /** 开始时间 */
    startTime: string;
    /** 结束时间 */
    endTime: string;
    /** 间隔时间 */
    limit: number;
    /** cron表达式 */
    cron: string;
    /** 执行次数 */
    every: number;
    /** 任务参数 */
    data: string;
    /** 任务配置 */
    jobOpts: string;
    /** 任务描述 */
    remark: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type TaskInfoParams = {
    id: number;
  };

  type TaskListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 任务名称 */
    name?: string;
    /** 调用的服务 */
    service?: string;
    /** 任务类别：cron | interval */
    type?: 0 | 1;
    /** 任务状态 */
    status?: 0 | 1;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 限制执行次数，负数则无限制 */
    limit?: number;
    /** cron表达式 */
    cron?: string;
    /** 执行间隔，毫秒单位 */
    every?: number;
    /** 执行参数 */
    data?: string;
    /** 任务备注 */
    remark?: string;
    _t?: number;
  };

  type TaskLogEntity = {
    /** 任务状态：0失败，1成功 */
    status: number;
    /** 任务日志信息 */
    detail: string;
    /** 任务耗时 */
    consumeTime: number;
    task: TaskEntity;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type TaskOnceParams = {
    id: number;
  };

  type TaskStartParams = {
    id: number;
  };

  type TaskStopParams = {
    id: number;
  };

  type TaskUpdateDto = {
    /** 任务名称 */
    name?: string;
    /** 调用的服务 */
    service?: string;
    /** 任务类别：cron | interval */
    type?: 0 | 1;
    /** 任务状态 */
    status?: 0 | 1;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 限制执行次数，负数则无限制 */
    limit?: number;
    /** cron表达式 */
    cron?: string;
    /** 执行间隔，毫秒单位 */
    every?: number;
    /** 执行参数 */
    data?: string;
    /** 任务备注 */
    remark?: string;
  };

  type TaskUpdateParams = {
    id: number;
  };

  type TodoDeleteParams = {
    id: number;
  };

  type TodoDto = {
    /** 名称 */
    value: string;
  };

  type TodoEntity = {
    /** todo */
    value: string;
    /** todo */
    status: boolean;
    user: UserEntity;
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type TodoInfoParams = {
    id: number;
  };

  type TodoListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 名称 */
    value: string;
    _t?: number;
  };

  type TodoUpdateDto = {
    /** 名称 */
    value?: string;
  };

  type TodoUpdateParams = {
    id: number;
  };

  type TreeResult = {
    id: number;
    parentId: number;
    children: string[];
  };

  type UploadToken = {
    /** 上传token */
    token: string;
  };

  type UserDeleteParams = {
    id: string | number;
  };

  type UserDto = {
    /** 头像 */
    avatar?: string;
    /** 登录账号 */
    username: string;
    /** 登录密码 */
    password: string;
    /** 归属角色 */
    roleIds: number[];
    /** 归属大区 */
    deptId?: number;
    /** 呢称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    phone?: string;
    /** QQ */
    qq?: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status: 0 | 1;
  };

  type UserEntity = {
    username: string;
    password: string;
    psalt: string;
    nickname: string;
    avatar: string;
    qq: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    roles: RoleEntity[];
    dept: DeptEntity;
    accessTokens: AccessTokenEntity[];
    id: number;
    createdAt: string;
    updatedAt: string;
  };

  type UserListParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    order?: 'ASC' | 'DESC';
    /** 头像 */
    avatar?: string;
    /** 登录账号 */
    username?: string;
    /** 登录密码 */
    password?: string;
    /** 归属角色 */
    roleIds?: number[];
    /** 归属大区 */
    deptId?: number;
    /** 呢称 */
    nickname?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    phone?: string;
    /** QQ */
    qq?: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status?: 0 | 1;
    _t?: number;
  };

  type UserPasswordDto = {
    /** 更改后的密码 */
    password: string;
  };

  type UserPasswordParams = {
    id: number;
  };

  type UserReadParams = {
    id: number;
  };

  type UserUpdateDto = {
    /** 头像 */
    avatar?: string;
    /** 登录账号 */
    username?: string;
    /** 登录密码 */
    password?: string;
    /** 归属角色 */
    roleIds?: number[];
    /** 归属大区 */
    deptId?: number;
    /** 呢称 */
    nickname?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    phone?: string;
    /** QQ */
    qq?: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status?: 0 | 1;
  };

  type UserUpdateParams = {
    id: number;
  };
}
