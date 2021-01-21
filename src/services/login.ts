import request, { noErrorRequest, BASE_URL } from '@/utils/request';
/**
 * 账户登录
 * @param {*} params 登陆信息
 */
export async function accountLogin(params) {
  // TODO 更新登录类型字段
  return request('/login?appMark=PC', {
    method: 'POST',
    prefix: BASE_URL,
    data: params,
  });
}

/**
 * 账户登出
 * @param {*} params
 */
export async function accountLogout(params) {
  return request('/logout', {
    method: 'POST',
    prefix: BASE_URL,
    data: params,
  });
}

/**
 * 获取手机验证码
 * @param {*} params
 */
export async function getCaptcha(params) {
  return request('/verification-code/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取验证码
 * @param {*} params
 */
export async function getVerificationImg() {
  return noErrorRequest('/verify-code', {
    method: 'GET',
    prefix: BASE_URL,
    responseType: 'blob',
  });
}
