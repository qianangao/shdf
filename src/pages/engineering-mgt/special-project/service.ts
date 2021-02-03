import request, { noErrorRequest } from '@/utils/request';

/**
 * 获取子任务列表
 * @param params
 */
export async function getChildrenTaskList(params: any) {
  return request(`/addressBook/find`, {
    method: 'GET',
    params,
  });
}

/**
 * 添加子任务
 * @param params
 */
export async function addChildrenTaskList(params: any) {
  return request(`/addressBook/${params}`, {
    method: 'GET',
    // params,
  });
}

/**
 * 编辑专项行动
 * @param params
 */
export async function editSpecialAction(params: any) {
  return request(`/addressBook/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 新增专项行动
 * @param params
 */
export async function addSpecialAction(params: any) {
  return request(`/addressBook/update`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 新增年度专项行动
 * @param params
 */
export async function addAnnualSpecialAction(params: any) {
  return request(`/addressBook/delete?bookIds=${params}`, {
    method: 'DELETE',
    data: params,
  });
}

/**
 * 专项行动查询
 * @param params
 */
export async function getSpecialAction() {
  return noErrorRequest(`/通讯录模板.xlsx`, {
    method: 'GET',
    responseType: 'blob',
  });
}
