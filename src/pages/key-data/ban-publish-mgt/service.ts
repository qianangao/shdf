import request from '@/utils/request';

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
