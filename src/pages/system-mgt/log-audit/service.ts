import request, { noErrorRequest } from '@/utils/request';
// 查询字典信息  queryType: dict
export async function getList(params) {
  return request(`/log-audit`, {
    method: 'GET',
    params,
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
