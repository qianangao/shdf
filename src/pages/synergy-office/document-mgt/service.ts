import request from '@/utils/request';

/**
 * 获取公告管理列表
 * @param params
 */
export async function getAnnouncementList(params: any) {
  return request(`/document/list`, {
    method: 'POST',
    data: params,
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
 * 获取已接收公告管理列表
 * @param params
 */
export async function getReceiveList(params: any) {
  return request(`/document/receiveList`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取公告信息详情
 * @param params
 */
export async function getAnnouncementDetail(params: any) {
  return request(`/document/queryById/${params.id}`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取已接收公告信息详情
 * @param params
 */
export async function getReceiveDetail(params: any) {
  return request(`/notice/record`, {
    method: 'GET',
    params,
  });
}

/**
 * 查询 公告处理情况
 * @param params
 */
export async function getReadInfo(params: any) {
  return request(`/notice/record/deal`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增公告信息
 * @param params
 */
export async function addAnnouncement(params: any) {
  return request(`/document/save`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 提交审核公告信息
 * @param params
 */
export async function commitExamineAnnouncement(params: any) {
  return request(`/notice/submit`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 审核公告信息
 * @param params
 */
export async function auditAnnouncement(params: any) {
  return request(`/notice/audit`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 修改公告信息
 * @param params
 */
export async function updateAnnouncement(params: any) {
  return request(`/document/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 删除公告信息
 * @param params
 */
export async function deleteAnnouncement(params: any) {
  return request(`/document/deleteById/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 发布公告信息
 * @param params
 */
export async function publishAnnouncement(params: any) {
  return request(`/document/receive${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 撤回/关闭公告信息
 * @param params noticeId : 公告id,
 * @param handleType : 0 撤回 1 关闭
 */
export async function rollbackOrCloseAnnouncement(params: any) {
  return request(`/notice/handle`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 回复公告信息
 * @param params
 */
export async function replyAnnouncement(params: any) {
  return request(`/notice/record/reply`, {
    method: 'PUT',
    data: params,
  });
}
