import request from '@/utils/request';

/**
 * 根据id获取可关联线索
 * @param {*} params
 */
export async function getCueAssociationById(params) {
  return request(`/clue-relation/relation`, {
    method: 'GET',
    params,
  });
}
