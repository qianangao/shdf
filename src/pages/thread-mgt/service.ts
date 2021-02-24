import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取線索列表
 * @param params
 */
export async function getAllClues(params: any) {
  return request(`/clue/list`, {
    method: 'GET',
    params,
  });
}
/**
 * 查看日志列表
 * @param params
 */
export async function getOperatingLogList(params: any) {
  return request(`/clue-oplog`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取线索详情
 * @param params
 */
export async function getClueDetail(params: any) {
  return request(`/clue/${params.clueId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增線索
 * @param params
 */
export async function addClue(params: any) {
  return request(`/clue1`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 编辑線索
 * @param params
 */
export async function editClue(params: any) {
  return request(`/clue1/${params.clueId}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 线索关联
 * @param params
 */
export async function commitCueAssociation(params: any) {
  return request(`/clue-relation`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 线索转办
 * @param params
 */
export async function transferAssociation(params: any) {
  return request(`/clue-circulation`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 线索主办
 * @param params
 */
export async function hostAssociation(params: any) {
  return request(`/clue-circulation/host`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 获取编码
 * @param params
 */
export async function getCode(params: any) {
  return request(`/shdfReceipt/getCode`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取编码
 * @param params
 */
export async function getProcessInfoList(params: any) {
  return request(`/clue-circulation/circulation`, {
    method: 'GET',
    params,
  });
}
/**
 * 提交审批
 * @param params
 */
export async function commitExamineClue(params: any) {
  return request(`/clue-approval/submit`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 授权用户
 * @param params
 */
export async function authorizeClue(params: any) {
  return request(`/auth-relation/auth`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 授权用户
 * @param params
 */
export async function feedbackClue(params: any) {
  return request(`/clue-circulation/feedback`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 删除线索信息
 * @param params
 */
export async function deleteClue(params: any) {
  return request(`/clue/${params.clueId}`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 结束线索信息
 * @param params
 */
export async function finishClue(params: any) {
  return request(`/clue/over/${params.clueId}`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 线索审批
 * @param params
 */
export async function approvalClue(params: any) {
  return request(`/clue-approval/approval`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 根据id获取已关联线索
 * @param {*} params
 */
export async function getCueAssociation(params: any) {
  return request(`/clue-relation/${params.clueId}`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取编码
 * @param params
 */
export async function getTemplate(params: any) {
  return noErrorRequest(`/${params.name}.xlsx`, {
    method: 'GET',
    responseType: 'blob',
  });
}
/**
 * 导入文件
 * @param params
 */
export async function importClue(params: any) {
  return request(`/clue/excel`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 导出文件
 * @param params
 */
export async function exportClue(params: any) {
  return noErrorRequest(`/clue/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}
