import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取录列表
 * @param params
 */
export async function getUserList(params: any) {
  return request(`/user/list`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取用户详情
 * @param params
 */
export async function getUserDetail(params: any) {
  return request(`/user/${params.userIds}`, {
    method: 'GET',
    // params,
  });
}

/**
 * 新增用户
 * @param params
 */
export async function addUser(params: any) {
  return request(`/user`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改用户录信息
 * @param params
 */
export async function updateUser(params: any) {
  return request(`/user`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 用户删除
 * @param params
 */
export async function deleteUser(params: any) {
  return request(`/user/${params}`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return noErrorRequest(`/通讯录模板.xlsx`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importAddressBook(params) {
  return request(`/addressBook/import`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportAddressBook(params) {
  return noErrorRequest(`/addressBook/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
