import request from '@/utils/request';

/**
 * 获取发文管理列表
 * @param {*} params
 */
export async function getReceivingList(params) {
  return request('/shdfReceipt/list', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取关工动态列表
 * @param {*} params
 */
export async function getReceivingReadList(params) {
  return request('/shdfReceipt/readList', {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getMemberList(params) {
  return request(`/care-generation/member/${params.mechanismId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getReceivingCode(params) {
  return request(`/shdfReceipt/getCode`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getReceivingDetail(params) {
  return request(`/shdfReceipt/queryById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 删除
 * @param {*} params
 */
export async function distribute(params) {
  return request(`/shdfReceipt/distribute/${params.id}`, {
    method: 'POST',
    data: params.params,
  });
}

/**
 * 删除
 * @param {*} params
 */
export async function deleteReceiving(params) {
  return request(`/shdfReceipt/deleteById/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 新增
 * @param {*} params
 */
export async function addReceiving(params) {
  return request(`/shdfReceipt/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function updateReceiving(params) {
  return request(`/shdfReceipt/save`, {
    method: 'POST',
    data: params,
  });
}
