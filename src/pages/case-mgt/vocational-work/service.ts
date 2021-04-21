import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取收文管理列表
 * @param {*} params
 */
export async function getCaseList(params) {
  return request('/shdfCase/list', {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取收文管理列表
 * @param {*} params
 */
export async function getClubList(params) {
  return request(`/shdfCase/clueList/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取关工动态列表
 * @param {*} params
 */
export async function getCaseHandleList(params) {
  return request(`/shdfCase/caseTansmitList/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getAuthorize(params) {
  return request(`/shdfCase/queryEmpowerByCaseId/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取关工组织成员列表
 * @param {*} params
 */
export async function getSpecial(params) {
  return request(`/specialAction/optionAction`, {
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
export async function getCaseDetail(params) {
  return request(`/shdfCase/queryById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 删除
 * @param {*} params
 */
export async function authorize(params) {
  return request(`/shdfCase/empower/${params.id}`, {
    method: 'POST',
    data: params.params,
  });
}

/**
 * 删除
 * @param {*} params
 */
export async function del(params) {
  return request(`/shdfCase/deleteById/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 新增
 * @param {*} params
 */
export async function addCaseHandle(params) {
  return request(`/shdfCase/saveCaseTansmit/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 新增
 * @param {*} params
 */
export async function addCase(params) {
  return request(`/shdfCase/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function clueRelation(params) {
  return request(`/shdfCase/clueRelation/${params.id}`, {
    method: 'POST',
    data: params.clubIds,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function updateCase(params) {
  return request(`/shdfCase/save`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function applyCase(params) {
  return request(`/shdfCase/applyApproval/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function recall(params) {
  return request(`/shdfCase/caseWithdraw/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function recordApproval(params) {
  return request(`/shdfCase/caseApproval/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getRecordDetail(params) {
  return request(`/shdfCase/queryRecordById/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getRecordApprovalDetail(params) {
  return request(`/shdfCase/queryApplyApproval/${params.id}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取详情
 * @param {*} params
 */
export async function getSuperviseApprovalDetail(params) {
  return request(`/shdfCase/queryApplySupervise/${params.id}`, {
    method: 'GET',
    params,
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
export async function applySupervise(params) {
  return request(`/shdfCase/applySupervise/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑
 * @param {*} params
 */
export async function completed(params) {
  return request(`/shdfCase/caseFinish/${params.id}`, {
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
 * 编辑
 * @param {*} params
 */
export async function superviseApproval(params) {
  return request(`/shdfCase/superviseApproval/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取督办审批信息
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
  return noErrorRequest(`/case/excel/template`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/**
 * 导入文件
 * @param params
 */
export async function importCase(params) {
  return request(`/case/excel/import`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportCase(params) {
  return noErrorRequest(`/case/excel/export`, {
    responseType: 'blob',
    method: 'POST',
    data: params,
  });
}
