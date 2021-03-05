import request from '@/utils/request';
/**
 * 获取统计分析数据
 * @param params
 */
export async function getAnaStatistics(params: any) {
  return request(`/analysis/caseStatistics`, {
    method: 'POST',
    data: params,
  });
}
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
