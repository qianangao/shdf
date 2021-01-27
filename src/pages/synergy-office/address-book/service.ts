import request from '@/utils/request';

/**
 * 获取通讯录列表
 * @param params
 */
export async function getAddressBook(params: any) {
  return request(`/api/addressBook/find`, {
    method: 'GET',
    params,
  });
}

// /**
//  * 获取重点机构详情
//  * @param params
//  */
// export async function getKeyInstitonDetail(params: any) {
//   return request(`/central/org/${params.id}`, {
//     method: 'GET',
//     params,
//   });
// }
/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return request(`/central/org`, {
    method: 'POST',
  });
}
/**
 * 导出文件
 * @param params
 */
export async function exportAddressBook(params) {
  return request(`/central/org`, {
    method: 'GET',
    params,
  });
}
/**
 * 导入文件
 * @param params
 */
export async function importAddressBook(params) {
  return request(`/api/addressBook/import`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增通讯录
 * @param params
 */
export async function addAddressBook(params: any) {
  return request(`/api/addressBook/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改通讯录信息
 * @param params
 */
export async function updateAddressBook(params: any) {
  return request(`/api/addressBook/update`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 通讯录删除
 * @param params
 */
export async function deleteAddressBook(params: any) {
  return request(`/api/addressBook/delete`, {
    method: 'DELETE',
    data: params,
  });
}
