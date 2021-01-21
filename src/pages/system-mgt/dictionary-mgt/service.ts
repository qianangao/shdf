import request from '@/utils/request';
// 查询字典信息  queryType: dict
export async function getDictList(params) {
  return request(`/dictionary/relation`, {
    method: 'GET',
    params,
  });
}
// 新增字典信息     params：chineseName、name
export async function addDict(params) {
  return request(`/dictionary/relation`, {
    method: 'POST',
    data: params,
  });
}
// 删除字典信息  params：ids
export async function deleteDicts(params) {
  return request(`/dictionary/relation`, {
    method: 'DELETE',
    data: params,
  });
}

// 根据chineseName查询字段信息  params：chineseName、queryType
export async function getFieldList(params) {
  return request(`/dictionary`, {
    method: 'GET',
    params,
  });
}

// 新增字段信息 params：remarks、code、chineseName
export async function addField(params) {
  return request('/dictionary', {
    method: 'POST',
    data: params,
  });
}

//
// 编辑字段信息 params：remarks、code
export async function updateField(params) {
  return request('/dictionary', {
    method: 'PUT',
    data: params,
  });
}

// 删除字段信息 params：idsDictionary
export async function deleteFields(params) {
  return request(`/dictionary`, {
    method: 'DELETE',
    data: params,
  });
}
