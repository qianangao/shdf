import request from '@/utils/request';

/**
 * 获取权限树
 *
 */
export async function getAuthTree(params) {
  return request(`/permession/getAll`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增权限
 * @param {*} params
 */
export async function addAuth(params) {
  return request('/permession/add', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改权限信息
 * @param {*} params
 */
export async function updateAuth(params) {
  return request(`/permession//update`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除权限
 * @param {*} params
 */
export async function deleteAuth(params) {
  return request(`/permession/delete`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取权限列表
 * @param {*} params
 */
export async function getAuthList(params) {
  return request('/permession/getListById', {
    method: 'GET',
    params,
  });
}

/**
 * 获取权限详情
 * @param params
 */
export async function getAuthDetail(params: any) {
  return request(`/addressBook/${params}`, {
    method: 'GET',
    // params,
  });
}
