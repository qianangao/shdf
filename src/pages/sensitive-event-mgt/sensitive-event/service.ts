import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取收文管理列表
 * @param {*} params
 */
export async function getList(params) {
  return request('/sensitiveEvent/list', {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取收文管理列表
 * @param {*} params
 */
export async function getClubList(params) {
  return request(`/sensitiveEvent/clueList/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取关工动态列表
 * @param {*} params
 */
export async function getCaseHandleList(params) {
  return request(`/sensitiveEvent/sensitiveEventHandleList/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getAuthorize(params) {
  return request(`/sensitiveEvent/querySensitiveAuthByEventId/${params.id}`, {
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
export async function getDetail(params) {
  return request(`/sensitiveEvent/queryById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 删除
 * @param {*} params
 */
export async function authorize(params) {
  return request(`/sensitiveEvent/saveSensitiveAuth`, {
    method: 'POST',
    data: params.params,
  });
}

/**
 * 删除
 * @param {*} params
 */
export async function del(params) {
  return request(`/sensitiveEvent/deleteByIds`, {
    method: 'DELETE',
    data: params.param,
  });
}
/**
 * 新增
 * @param {*} params
 */
export async function addCaseHandle(params) {
  return request(`/sensitiveEvent/saveSensitiveEventHandle`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增
 * @param {*} params
 */
export async function add(params) {
  return request(`/sensitiveEvent/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function updateCase(params) {
  return request(`/sensitiveEvent/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function applyCase(params) {
  return request(`/sensitiveEvent/applyApproval`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function recall(params) {
  return request(`/sensitiveEvent/sensitiveEventWithdraw/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function recordApproval(params) {
  return request(`/sensitiveEvent/sensitiveEventApproval/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getRecordDetail(params) {
  return request(`/sensitiveEvent/queryRecordById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getRecordApprovalDetail(params) {
  return request(`/sensitiveEvent/queryApplyApproval/${params.id}`, {
    method: 'GET',
    // params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function clueRelation(params) {
  return request(`/sensitiveEvent/clueRelation/${params.id}`, {
    method: 'POST',
    data: params.clubIds,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function supervise(params) {
  return request(`/shdfCase/saveSupervise/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function completed(params) {
  return request(`/sensitiveEvent/sensitiveEventFinish/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function evaluate(params) {
  return request(`/shdfCase/saveEvaluate/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function evaluateFeedback(params) {
  return request(`/shdfCase/feedbackEvaluate/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function recallSupervise(params) {
  return request(`/shdfCase/superviseWithdraw/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getSuperviseDetail(params) {
  return request(`/shdfCase/querySuperviseById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 模板下载
 * @param params
 */
export async function templateDownload() {
  return noErrorRequest(`/sensitiveEvent/excel/template`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importCase(params) {
  return request(`/sensitiveEvent/excel/import`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportCase(params) {
  return noErrorRequest(`/sensitiveEvent/excel/export`, {
    method: 'POST',
    data: params,
    responseType: 'blob',
  });
}
