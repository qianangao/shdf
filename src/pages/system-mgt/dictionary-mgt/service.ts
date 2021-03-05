import request from '@/utils/request';
// 查询字典信息  queryType: dict
export async function getDictList(params) {
  return request(`/dict`, {
    method: 'GET',
    params,
  });
}
// 编辑字段信息 params：remarks、code
export async function updateDict(params) {
  return request('/dict/dictUpdate', {
    method: 'PUT',
    data: params,
  });
}
// 新增字典信息     params：chineseName、name
export async function addDict(params) {
  return request(`/dict`, {
    method: 'POST',
    data: params,
  });
}
// 删除字典信息  params：ids
export async function deleteDicts(params) {
  return request(`/dict/deleteDict`, {
    method: 'DELETE',
    data: params,
  });
}

// 根据chineseName查询字段信息  params：chineseName、queryType
export async function getFieldList(params) {
  return request(`/dict`, {
    method: 'GET',
    params,
  });
}

// 新增字段信息 params：remarks、code、chineseName
export async function addType(params) {
  return request('/dict/type', {
    method: 'POST',
    data: params,
  });
}

//
// 编辑字段信息 params：remarks、code
export async function updateType(params) {
  return request('/dict/typeUpdate', {
    method: 'PUT',
    data: params,
  });
}

// 删除字段信息 params：idsDictionary
export async function deleteTypes(params) {
  return request(`/dict/deleteDictType`, {
    method: 'DELETE',
    data: params,
  });
}
