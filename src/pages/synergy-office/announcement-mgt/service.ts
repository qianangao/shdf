import request from '@/utils/request';

/**
 * 获取公告管理列表
 * @param params
 */
export async function getAnnouncementList(params: any) {
  return request(`/notices`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取公告信息详情
 * @param params
 */
export async function getAnnouncementDetail(params: any) {
  return request(`/notice`, {
    method: 'GET',
    params,
  });
}

/**
 * 查询 公告阅读情况
 * @param params
 */
export async function getReadInfo(params: any) {
  return request(`/notice/reading/record`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增公告信息
 * @param params
 */
export async function addAnnouncement(params: any) {
  return request(`/notice`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改公告信息
 * @param params
 */
export async function updateAnnouncement(params: any) {
  return request(`/notice`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除公告信息
 * @param params
 */
export async function deleteAnnouncement(params: any) {
  return request(`/notice`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 发布公告信息
 * @param params
 */
export async function publishAnnouncement(params: any) {
  return request(`/notice/publish`, {
    method: 'PUT',
    data: params,
  });
}
