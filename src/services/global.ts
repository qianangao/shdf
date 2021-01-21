import request from '@/utils/request';

/**
 * 根据name获取字段的可选属性
 * @param {*} params
 */
export async function getDictionary(params) {
  return request('/dictionary', {
    method: 'GET',
    params,
  });
}

/**
 * 上传文件到文件服务器
 * @param {*} params 登陆信息
 */
export async function uploadFile(params) {
  return request('/ceph', {
    method: 'POST',
    data: params,
  });
}

/**
 * 上传文件到本地服务器
 * @param {*} params
 */
export async function uploadLocalFile(params) {
  return request('/attachmentsftpto', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取用户下载文件列表
 * @param {*} params
 */
export async function getDownloadFiles(params) {
  return request('/download_center/user', {
    method: 'GET',
    params,
  });
}

/**
 * 删除用户下载文件缓存
 * @param {*} params
 */
export async function deleteDownloadFiles(params) {
  return request('/download_center', {
    method: 'DELETE',
    data: params,
  });
}
