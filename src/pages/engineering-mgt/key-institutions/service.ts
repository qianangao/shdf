import request from '@/utils/request';

/**
 * 获取重点机构列表
 * @param params
 */
export async function getKeyInstitons(params: any) {
  return request(`/central/org`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取重点机构详情
 * @param params
 */
export async function getKeyInstitonDetail(params: any) {
  return request(`/central/org/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增重点机构
 * @param params
 */
export async function addKeyInstiton(params: any) {
  return request(`/central/org`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改重点机构信息
 * @param params
 */
export async function updateKeyInstiton(params: any) {
  return request(`/central/org`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 重点机构删除
 * @param params
 */
export async function deleteKeyInstiton(params: any) {
  return request(`/central/org`, {
    method: 'DELETE',
    data: params,
  });
}
