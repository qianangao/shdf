import request from '@/utils/request';

/**
 * 获取单位树
 *
 */
export async function getRoleTree() {
  return request(`/organization/child/all`, {
    method: 'GET',
  });
}

// /**
//  * 模板下载
//  * @param params
//  */
// export async function templateDownload() {
//   return noErrorRequest(`/人员信息模板.xlsx`, {
//     method: 'GET',
//     responseType: 'blob',
//   });
// }

// /**
//  * 导入文件
//  * @param params
//  */
// export async function importUserInfo(params) {
//   return request(`/addressBook/import`, {
//     method: 'POST',
//     data: params,
//   });
// }

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
  return request(`/role`, {
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
  return request('/role/list', {
    method: 'GET',
    params,
  });
}
// /**
//  * 分配用户
//  * @param {*} params
//  */
// export async function distributeUser(params) {
//   return request('/role/distributeUser', {
//     method: 'POST',
//     data:params,
//   });
// }

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

// /**
//  * 根据id获取权限树
//  *
//  */
// export async function getRulesById(params) {
//   return request(`/specialAction/findTree`, {
//     method: 'GET',
//     params,
//   });
// }

/**
 * 获取用户权限树
 *
 */
export async function getRoleRules(params) {
  return request(`/role/acl`, {
    method: 'GET',
    params,
  });
}
/**
 * 修改用户权限树
 *
 */
export async function updateRoleRules(params) {
  return request(`/role/distributeAcl`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取角色详情
 * @param params
 */
export async function getRoleDetail(params: any) {
  return request(`/role`, {
    method: 'GET',
    params,
  });
}
// /**
//  * 获取人员详情
//  * @param params
//  */
// export async function getUserDetail(params: any) {
//   return request(`/addressBook/${params}`, {
//     method: 'GET',
//     // params,
//   });
// }

// /**
//  * 获取人员信息列表
//  * @param {*} params
//  */
// export async function getUserList(params) {
//   return request('/user', {
//     method: 'GET',
//     params,
//   });
// }

// /**
//  * 新增人员
//  * @param {*} params
//  */
// export async function addUser(params) {
//   return request('/user', {
//     method: 'POST',
//     data: params,
//   });
// }

// /**
//  * 修改人员信息
//  * @param {*} params
//  */
// export async function updateUser(params) {
//   return request(`/role/${params.id}`, {
//     method: 'PUT',
//     data: params,
//   });
// }
