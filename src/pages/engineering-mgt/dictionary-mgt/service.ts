import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取工程树
 *
 */
export async function getEngineeringTree(params) {
  return request(`/unifyProject/findProjectUnifyTree`, {
    method: 'GET',
    params,
  });
}

/**
 * 删除工程
 * @param params
 */
export async function deleteEngineeringData(params) {
  return request(`/unifyProject/deleteProjectUnify`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 联防工程查询/复用历史信息查询
 * @param params
 */
export async function queryEngineeringData(params) {
  return request(`/unifyProject/findProjectUnify`, {
    method: 'GET',
    params,
  });
}

/**
 * 新增工程、新增年度工程
 * @param params
 */
export async function addEngineering(params: any) {
  return request(`/unifyProject/addProjectUnify`, {
    method: 'POST',
    data: params,
  });
}
/**
 *编辑工程、编辑年度工程
 * @param params
 */
export async function editEngineering(params: any) {
  return request(`/unifyProject/updateProjectUnify`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取年度联防工程任务列表
 * @param params
 */
export async function getEngineeringList(params) {
  return request(`/projectTask/findProjectTaskList`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增联防工程任务
 * @param params
 */
export async function addProjectTaskList(params) {
  return request(`/projectTask/addProjectTask`, {
    method: 'POST',
    data: params,
  });
}
/**
 * 修改联防工程任务
 * @param params
 */
export async function updateProjectTaskList(params) {
  return request(`/projectTask/updateProjectTask`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除联防工程重要人物
 * @param params
 */
export async function deleteProjectTask(params) {
  return request(`/projectTask/deleteProjectTask`, {
    method: 'DELETE',
    data: params,
  });
}
/**
 * 联防工程任务详情
 * @param paramsDetail
 */
export async function projectTaskDetail(params) {
  return request(`/projectTask/findProjectTaskDetail`, {
    method: 'GET',
    params,
  });
}

/**
 * 任务进度导出
 *
 */
export async function exportLog(params) {
  return noErrorRequest(`/projectTask/export`, {
    method: 'GET',
    responseType: 'blob',
    params,
  });
}

/**
 * 重要任务下发
 * @param params
 */
export async function deployProjectTaskList(params) {
  return request(`/projectTaskDeploy/deploy`, {
    method: 'POST',
    data: params,
  });
}

/**
 *省数据
 *
 */
export async function provinceData() {
  return request(`/org/deploy`, {
    method: 'GET',
  });
}

/**
 * 获取信息报送详情
 * @param params
 */
export async function getInfoDetail(params: any) {
  return request(`/project-information/${params}`, {
    method: 'GET',
    params,
  });
}
/**
 * 修改重点机构信息
 * @param params
 */
export async function updateInfoAn(params: any) {
  return request(`/project-information`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 发布重点机构信息
 * @param params
 */
export async function releaseInfoAn(params: any) {
  return request(`/project-information/release`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 获取信息报送详情
 * @param params
 */
export async function getInfoStatistics(params: any) {
  return request(`/project-information/statistics`, {
    method: 'GET',
    params,
  });
}
/**
 * 获取通报列表
 * @param params
 */
export async function getInfoAnList(params: any) {
  return request(`/project-information`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增信息报送
 * @param params
 */
export async function addInfoAn(params: any) {
  return request(`/project-information`, {
    method: 'POST',
    data: params,
  });
}
