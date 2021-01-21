import request from '@/utils/request';

/**
 * 重置用户密码
 * @param {*} params
 */
export async function resetPassword(params) {
  return request(`/user/change_password`, {
    method: 'PUT',
    data: params,
  });
}
