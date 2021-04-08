import request from '@/utils/request';

// 查询  queryType: dict
export async function getList(params) {
  return request(`/key-words`, {
    method: 'GET',
    params,
  });
}
// 新增
export async function add(params) {
  return request('/key-words', {
    method: 'POST',
    data: params,
  });
}
/**
 * 修改
 * @param {*} params
 */
export async function update(params) {
  return request(`/key-words`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除
 * @param {*} params
 */
export async function deletekw(params) {
  return request(`/key-words/?keyWordId=${params.keyWordId}`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 使用关键字
 * @param {*} params
 */
export async function usekw(params) {
  return request(`/key-words/use`, {
    method: 'PUT',
    data: params,
  });
}
