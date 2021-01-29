import request,{noErrorRequest} from '@/utils/request';

/**
 * 获取通讯录列表
 * @param params
 */
export async function getAddressBook(params: any) {
  return request(`/addressBook/find`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取通讯录人员详情
 * @param params
 */
export async function getAddressBookDetail(params: any) {
  return request(`/addressBook/${params}`, {
    method: 'GET',
    // params,
  });
}

/**
 * 新增通讯录
 * @param params
 */
export async function addAddressBook(params: any) {
  return request(`/addressBook/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改通讯录信息
 * @param params
 */
export async function updateAddressBook(params: any) {
  return request(`/addressBook/update`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 通讯录删除
 * @param params
 */
export async function deleteAddressBook(params: any) {
  return request(`/addressBook/delete?bookIds=${params}`, {
    method: 'DELETE',
    data: params,
  });
}

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
  return noErrorRequest(`/addressBook/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importAddressBook(params) {
  return request(`/addressBook/import`, {
    method: 'POST',
    data: params,
  });
}



