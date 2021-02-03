import request from '@/utils/request';

/**
 * 获取線索列表
 * @param params
 */
export async function getAllClues(params: any) {
  return request(`/clue/list`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增線索
 * @param params
 */
export async function addKeyInstiton(params: any) {
  return request(`/central/org`, {
    method: 'POST',
    data: params,
  });
}
