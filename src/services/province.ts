import request from '@/utils/request';

/**
 * 获取省市级联动数据
 * @param {*} params
 */
export async function getProvinceData(params) {
  return request(`/area`, {
    method: 'GET',
    params,
  });
}
