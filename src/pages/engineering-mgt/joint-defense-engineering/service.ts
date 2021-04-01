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
    method: 'PUT',
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
 * 任务反馈新增
 *
 */
export async function addFeedback(params) {
  return request(`/projectTaskFeedbackLog/addProjectTaskFeedbackLog`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 临时省份新增
 *
 */
export async function addTempProvince(params) {
  return request(`/projectProvince/addProjectProvince`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取会议列表
 * @param params
 */
export async function getMeetingList(params: any) {
  return request(`/projectMeeting//findMeetingList`, {
    method: 'GET',
    params,
  });
}

/**
 * 获取会议数据详情
 * @param params
 */
export async function getMeetingDetail(params) {
  return request(`/projectMeeting/${params}`, {
    method: 'GET',
  });
}

/**
 * 新增会议
 * @param params
 */
export async function addMeeting(params: any) {
  return request(`/projectMeeting/addMeeting`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改会议
 * @param params
 */
export async function updateMeeting(params: any) {
  return request(`/projectMeeting/updateMeeting`, {
    method: 'PUT',
    data: params,
  });
}
/**
 * 删除会议
 * @param params
 */
export async function deleteMeeting(params: any) {
  return request(`/projectMeeting/delete?meetingId=${params}`, {
    method: 'DELETE',
    // data: params,
  });
}
/**
 * 上报会议
 * @param params
 */
export async function exportMeeting(params: any) {
  return request(
    `/projectMeeting/report?meetingId=${params.meetingId}&projectId=${params.projectId}`,
    {
      method: 'GET',
    },
  );
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

/**
 * 获取工程数据列表
 * @param params
 */
export async function getEngineList(params: any) {
  return request(`/project-data`, {
    method: 'GET',
    params,
  });
}
/**
 * 新增工程数据
 * @param params
 */
export async function addEngineData(params: any) {
  return request(`/project-data`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 查堵目录列表
 * @param params
 */
export async function getEngineeringBanPublishList(params: any) {
  return request(`/engineering-relation/illegal/relation`, {
    method: 'GET',
    params,
  });
}

/**
 * 可关联非法出版物
 * @param params
 */
export async function getRelevancyBanPublishList(params: any) {
  return request(`/engineering-relation/illegal/relevancy`, {
    method: 'GET',
    params,
  });
}

/**
 * 工程关联人员列表
 * @param params
 */
export async function getEngineeringKeyPersonList(params: any) {
  return request(`/engineering-relation/person/relation`, {
    method: 'GET',
    params,
  });
}

/**
 * 可关联人员列表
 * @param params
 */
export async function getRelevancyPersonList(params: any) {
  return request(`/engineering-relation/person/relevancy`, {
    method: 'GET',
    params,
  });
}

/**
 * 工程关联机构列表
 * @param params
 */
export async function getEngineeringKeyInstitutionsList(params: any) {
  return request(`/engineering-relation/org/relation`, {
    method: 'GET',
    params,
  });
}

/**
 * 可关联机构列表
 * @param params
 */
export async function getRelevancyInstitutionsList(params: any) {
  return request(`/engineering-relation/org/relevancy`, {
    method: 'GET',
    params,
  });
}

/**
 * 工程关联线索列表
 * @param params
 */
export async function getEngineeringClueList(params: any) {
  return request(`/engineering-relation/clue/relation`, {
    method: 'GET',
    params,
  });
}

/**
 * 可关联线索列表
 * @param params
 */
export async function getRelevancyClueList(params: any) {
  return request(`/engineering-relation/clue/relevancy`, {
    method: 'GET',
    params,
  });
}

/**
 * 关联数据
 * @param params
 */
export async function relationEngineering(params: any) {
  return request(`/engineering-relation/relation`, {
    method: 'POST',
    params,
  });
}
