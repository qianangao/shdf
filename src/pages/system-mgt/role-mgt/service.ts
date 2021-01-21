import request from '@/utils/request';

/**
 * 新增角色
 * @param {*} params
 */
export async function addRole(params) {
  return request('/role', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改角色信息
 * @param {*} params
 */
export async function updateRole(params) {
  return request(`/role/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除角色
 * @param {*} params
 */
export async function deleteRoles(params) {
  return request(`/role`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 获取角色列表
 * @param {*} params
 */
export async function getRoleList(params) {
  return request('/role', {
    method: 'GET',
    params,
  });
}
