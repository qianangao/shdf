import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取重点人物列表
 * @param params
 */
export async function getKeyPerson(params: any) {
  return request(`/central/persons`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取重点人物详情
 * @param params
 */
export async function getKeyPersonDetail(params: any) {
  return request(`/central/person`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增重点人物
 * @param params
 */
export async function addKeyPerson(params: any) {
  return request(`/central/person`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改重点人物信息
 * @param params
 */
export async function updateKeyPerson(params: any) {
  return request(`/central/person`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 重点人物删除
 * @param params
 */
export async function deleteKeyPerson(params: any) {
  return request(`/central/person`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 授权
 * @param params
 */
export async function authUser(params: any) {
  return request(`/central/auth`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return noErrorRequest(`/central/person/excel/template`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importPerson(params) {
  return request(`/central/person/excel/import`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportPerson(params) {
  return noErrorRequest(`/central/person/excel/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
