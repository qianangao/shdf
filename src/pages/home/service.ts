import request from '@/utils/request';

/**
 * 通知公告-列表
 * @param {*} params
 */
export async function noticeAnnouncementList(params) {
  return request('/notice', {
    method: 'GET',
    params,
  });
}
/**
 * 通知公告-详情
 * @param {*} params
 */
export async function detailNoticeAnnouncement(params) {
  return request(`/notice/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 风采列表
 * @param {*} params
 */
export async function elegantDemeanorList(params) {
  return request('/style_five_old', {
    method: 'GET',
    params,
  });
}
/**
 * 风采列表-详情
 * @param {*} params
 */
export async function detailElegantDemeanor(params) {
  return request(`/style_five_old/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 图片新闻
 * @param {*} params
 */
export async function pictureList(params) {
  return request('/news', {
    method: 'GET',
    params,
  });
}
/**
 * 图片新闻
 * @param {*} params
 */
export async function detailPicture(params) {
  return request(`/news/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 成果展台列表
 * @param {*} params
 */
export async function achievementList(params) {
  return request('/result-display', {
    method: 'GET',
    params,
  });
}
/**
 * 成果展台
 * @param {*} params
 */
export async function detailAchievement(params) {
  return request(`/result-display/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 涉老政策-列表
 * @param {*} params
 */
export async function elderlyPolicyList(params) {
  return request('/concerning_old', {
    method: 'GET',
    params,
  });
}
/**
 * 涉老政策
 * @param {*} params
 */
export async function detailElderlyPolicy(params) {
  return request(`/concerning_old/${params.id}`, {
    method: 'GET',
    params,
  });
}
