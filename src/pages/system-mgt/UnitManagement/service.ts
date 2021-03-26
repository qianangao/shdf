import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取组织列表
 * @param params
 */
export async function getOrgList(params: any) {
  return request(`/org/list`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取组织详情
 * @param params
 */
export async function getOrgListDetail(params: any) {
  return request(`/org/${params.orgId}`, {
    method: 'GET',
    // params,
  });
}

/**
 * 新增组织
 * @param params
 */
export async function addOrgList(params: any) {
  return request(`/org`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改组织
 * @param params
 */
export async function updateOrgList(params: any) {
  return request(`/org`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 组织管理删除
 * @param params
 */
export async function deleteOrgList(params: any) {
  return request(`/org/${params}`, {
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
