import request from '@/utils/request';

/**
 * 获取工程树
 *
 */
export async function getEngineeringTree(params) {
  return request(`/specialAction/findTree`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取项目年度工程任务列表
 * @param params
 */
export async function getEngineeringList(params) {
  return request(`/task/findSubtaskList`, {
    method: 'GET',
    params,
  });
}

/**
 * 删除工程
 * @param params
 */
export async function deleteEngineeringData(actionId) {
  return request(`/specialAction/delete?actionId=${actionId}`, {
    method: 'DELETE',
  });
}

/**
 * 联防工程查询/复用历史信息查询
 * @param params
 */
export async function queryEngineeringData(params) {
  return request(`/specialAction/find`, {
    method: 'GET',
    params,
  });
}
