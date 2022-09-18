import { request } from '@/utils/request';
import Api from '@/core/permission/modules/netdisk/manage';

export function netdiskManageList(params: API.NetdiskManageListParams) {
  return request<API.NetdiskManageList>({
    url: Api.list,
    method: 'get',
    params,
  });
}

export function mkdir(data: API.MkdirParams) {
  return request({
    url: Api.mkdir,
    method: 'post',
    data,
  });
}

export function getUploadToken() {
  return request<{ token: string }>({
    url: Api.token,
    method: 'get',
  });
}

export function fileInfo(data: API.getManageParams) {
  return request<API.FileInfo>({
    url: Api.info,
    method: 'post',
    data,
  });
}

export function fileMark(data: API.FIleMarkParams) {
  return request({
    url: Api.mark,
    method: 'post',
    data,
  });
}

export function downloadFile(data: API.getManageParams) {
  return request({
    url: Api.download,
    method: 'post',
    data,
  });
}
export function renameFile(data: API.FileRenameParams) {
  return request({
    url: Api.rename,
    method: 'post',
    data,
  });
}

export function delFileOrDir(data: API.DelFileOrDirParams) {
  return request({
    url: Api.delete,
    method: 'post',
    data,
  });
}

export function fileBatchCut(data: API.fileBatchCutParams) {
  return request({
    url: Api.cut,
    method: 'post',
    data,
  });
}

export function fileBatchCopy(data: API.fileBatchCutParams) {
  return request({
    url: Api.copy,
    method: 'post',
    data,
  });
}
