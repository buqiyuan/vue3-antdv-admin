declare namespace API {
  type FileType = 'file' | 'dir';

  type NetdiskManageListParams = {
    /** 分页标识 */
    marker: string;
    /** 当前路径 */
    path: string;
    /** 搜索关键字 */
    key?: string;
  };

  type NetdiskManageListItem = {
    id: string;
    type: FileType;
    name: string;
    putTime: string;
    fsize: string;
    mimeType: string;
    belongTo: string;
  };

  type NetdiskManageList = {
    /** 文件列表 */
    list: NetdiskManageListItem[];
    /** 分页标志，空则代表加载完毕 */
    marker: string | null;
  };

  type MkdirParams = {
    /** 文件夹名称 */
    dirName: string;
    /** 所属路径 */
    path: string;
  };

  type getManageParams = {
    /** 文件名 */
    name: string;
    /** 文件所在路径 */
    path: string;
  };

  type FileInfo = {
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

  type FIleMarkParams = {
    name: string;
    path: string;
    mark: string;
  };

  type FileRenameParams = {
    type: string;
    toName: string;
    name: string;
    path: string;
  };

  type File = {
    type: FileType;
    name: string;
  };

  type DelFileOrDirParams = {
    files: File[];
    path: string;
  };

  type fileBatchCutParams = {
    files: File[];
    originPath: string;
    toPath: string;
  };

  type OverviewSpaceInfo = {
    // 当前使用容量
    spaceSize: number;
    // 当前文件数量
    fileSize: number;
    // 当天使用流量
    flowSize: number;
    // 当天请求次数
    hitSize: number;
    // 流量趋势，从当月1号开始计算
    flowTrend: {
      times: number[];
      datas: number[];
    };
    // 容量趋势，从当月1号开始计算
    sizeTrend: {
      times: number[];
      datas: number[];
    };
  };
}
