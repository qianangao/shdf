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
 * 根据搜索获取完整组织树结构
 * @param {*} params
 */
export async function searchOrgTree(params) {
  return request('/organization/all-child', {
    method: 'GET',
    params,
  });
}

/**
 * 根据id获取完整组织树结构
 * @param {*} params
 */
export async function getAllOrgTree(params?: any) {
  return request(`/organization/child`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取员工列表
 * @param {*} params
 */
export async function getStaffList(params) {
  return request('/users', {
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
