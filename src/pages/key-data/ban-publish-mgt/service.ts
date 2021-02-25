import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取非法出版物列表
 * @param params
 */
export async function getKeyBanPublishList(params: any) {
  return request(`/illegal/findIllegalPublicationList`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取非法出版物详情
 * @param params
 */
export async function getBanPublishDetail(params: any) {
  return request(`/illegal/findIllegalPublication`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增非法出版物
 * @param params
 */
export async function addBanPublish(params: any) {
  return request(`/illegal/addIllegalPublication`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改非法出版物
 * @param params
 */
export async function updateBanPublish(params: any) {
  return request(`/illegal/updateIllegalPublication`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除非法出版物
 * @param params
 */
export async function deleteBanPublish(params: any) {
  return request(`/illegal/deleteIllegalPublication`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 授权
 * @param params
 */
export async function authUser(params: any) {
  return request(`/illegal/centralAuth`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return noErrorRequest(`/illegal/excel/template`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importBanPublish(params) {
  return request(`/illegal/excel/import`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportBanPublish(params) {
  return noErrorRequest(`/illegal/excel/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
