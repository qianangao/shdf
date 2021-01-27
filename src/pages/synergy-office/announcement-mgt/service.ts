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
  return request(`/notice/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增公告信息
 * @param params
 */
export async function addAnnouncement(params: any) {
  return request(`/central/org`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改公告信息
 * @param params
 */
export async function updateAnnouncement(params: any) {
  return request(`/central/org`, {
    method: 'PUT',
    data: params,
  });
}
