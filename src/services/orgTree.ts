import request from '@/utils/request';

/**
 * 根据id获取组织树信息（单级）
 * @param {*} params
 */
export async function getOrgTreeById(params) {
  return request(`/organization/directly-child`, {
    method: 'GET',
    params,
  });
}

/**
 * 根据id获取子集组织树结构
 * @param {*} params
 */
export async function getOrgTree(params?: any) {
  return request(`/organization/child`, {
    method: 'GET',
    params,
  });
}
/**
 * 根据id获取同级组织树结构
 * @param {*} params
 */
export async function getCoOrganizerOrganization(params?: any) {
  return request(`/organization/sameLevel`, {
    method: 'GET',
    params,
  });
}
/**
 * 根据id获取所有组织树结构
 * @param {*} params
 */
export async function getAllOrganization(params?: any) {
  return request(`/organization/child/all`, {
    method: 'GET',
    params,
  });
}

/**
 * 根据id获取组织用户
 * @param {*} params
 */
export async function getOrgPerson(params: any) {
  return request(`/user`, {
    method: 'GET',
    params,
  });
}

/* ================ other ========================== */

/**
 * 新增组织
 * @param {*} params
 */
export async function addOrg(params) {
  return request('/organization', {
    method: 'POST',
    data: params,
  });
}

/**
 * 根据id修改组织信息
 * @param {*} params
 */
export async function updateOrg(params) {
  return request(`/organization`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 根据所选id删除组织
 * @param {*} params
 */
export async function deleteOrgs(params) {
  return request('/organization', {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 根据搜索获取组织列表
 * @param {*} params
 */
export async function getOrgList(params) {
  return request('/organization', {
    method: 'GET',
    params,
  });
}

/**
 * 根据id获取组织信息
 * @param {*} params
 */
export async function getOrgItem(params) {
  return request(`/organizationItem`, {
    method: 'GET',
    params,
  });
}
