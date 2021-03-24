import request from '@/utils/request';
// 查询字典信息  queryType: dict
export async function getList(params) {
  return request(`/message/unreadList/admin`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取权限列表
 * @param {*} params
 */
export async function getUnReadNum(params) {
  return request(`/message/unreadNum/${params.id}`, {
    method: 'GET',
  });
}
/**
 * 获取权限列表
 * @param {*} params
 */
export async function getNewNum(params) {
  return request(`/message/signRead/${params.id}`, {
    method: 'GET',
  });
}
/**
 * 导出文件
 * @param params
 */
export async function exportLog(params) {
  return noErrorRequest(`/log-audit/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
