import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取子任务列表
 * @param params
 */
export async function getChildrenTaskList(params) {
  return request(`/task/findSubtaskList`, {
    method: 'GET',
    params,
  });
}

/**
 * 添加子任务
 * @param params
 */
export async function addChildrenTaskList(params) {
  return request(`/task/addSubtask`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改子任务
 * @param params
 */
export async function updateChildrenTaskList(params) {
  return request(`/task/updateSubtask`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 查询子任务详情
 * @param params
 */
export async function findChildrenTaskDetail(params) {
  return request(`/task/findSubtask`, {
    method: 'GET',
    params,
  });
}
// /**
//  * 阶段反馈要求列表
//  * @param params
//  */
// export async function FeedbackRequestList(params) {
//   return request(`/taskFeedback/findTaskFeedbackList`, {
//     method: 'GET',
//     params,
//   });
// }
/**
 * 阶段反馈要求新增、总要求反馈新增
 * @param params
 */
export async function addFeedbackRequest(params) {
  return request(`/taskFeedback/addStageFeedback`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 阶段反馈要求删除
 * @param params
 */
export async function deleteFeedbackRequest(params) {
  return request(`/taskFeedback/deleteStageFeedback?feedbackId=${params}`, {
    method: 'DELETE',
  });
}

/**
 * 新增专项行动
 * @param params
 */
export async function addSpecialAction(params: any) {
  return request(`/specialAction/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新增年度专项行动
 * @param params
 */
export async function addAnnualSpecialAction(params: any) {
  return request(`/specialAction/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除专项行动
 * @param params
 */
export async function deleteSpecialAction(actionId) {
  return request(`/specialAction/delete?actionId=${actionId}`, {
    method: 'DELETE',
    // data: params,
  });
}

/**
 * 编辑专项行动
 * @param params
 */
export async function editSpecialAction(params: any) {
  return request(`/specialAction/update`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 专项行动查询/复用历史信息查询
 * @param params
 */
export async function getSpecialAction(params) {
  return noErrorRequest(`/specialAction/find`, {
    method: 'GET',
    params,
  });
}

// /**
//  * 复用历史信息查询
//  * @param params
//  */
// export async function getHistoryInfoAction() {
//   return noErrorRequest(`/specialAction/findReuseHistory`, {
//     method: 'GET',
//   });
// }

/**
 * 获取专项行动树
 *
 */
export async function getSpecialActionTree(params) {
  return request(`/specialAction/findTree`, {
    method: 'GET',
    params,
  });
}
