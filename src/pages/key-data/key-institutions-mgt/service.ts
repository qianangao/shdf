import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取重点机构列表
 * @param params
 */
export async function getKeyInstitutions(params: any) {
  return request(`/central/org`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取重点机构详情
 * @param params
 */
export async function getKeyInstitutionsDetail(params: any) {
  return request(`/central/org/${params.orgId}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增重点机构
 * @param params
 */
export async function addKeyInstitutions(params: any) {
  return request(`/central/org`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改重点机构信息
 * @param params
 */
export async function updateKeyInstitutions(params: any) {
  return request(`/central/org/${params.orgId}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 重点机构删除
 * @param params
 */
export async function deleteKeyInstitutions(params: any) {
  return request(`/central/org/${params.orgId}`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 授权
 * @param params
 */
export async function authUser(params: any) {
  return request(`/central/org/auth`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return noErrorRequest(`/central/org/excel/template`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importInstitutions(params) {
  return request(`/central/org/excel`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportInstitutions(params) {
  return noErrorRequest(`/central/org/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
