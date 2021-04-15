import { getProvinceData } from '@/services/province';
import { LocalCache } from '@/utils/storage';

const findData = ({ areaPid, mPId }, data) => {
  // 查询一级节点
  if (!areaPid) {
    return { children: data };
  }

  const tempData = { children: data };

  // 查询二级节点
  if (areaPid && (!mPId || mPId === '100000')) {
    // eslint-disable-next-line no-loop-func
    return tempData.children.find(item => item.value === areaPid) || { value: areaPid };
  }

  // 查询三级节点
  if (areaPid && mPId) {
    // eslint-disable-next-line no-loop-func
    const pNode = tempData.children.find(item => item.value === mPId);

    if (!pNode) {
      return { value: mPId };
    }

    // eslint-disable-next-line no-loop-func
    return pNode.children.find(item => item.value === areaPid) || { value: areaPid };
  }

  return { children: null };
};

const Model = {
  namespace: 'globalProvince',
  state: {
    provinceData: LocalCache.get('areaInfo') || [],
  },
  effects: {
    *getData({ payload = {} }, { call, put, select }) {
      const provinceData = yield select(state => state.globalProvince.provinceData);

      const selectData = findData(payload, provinceData);

      if (selectData && selectData.children && selectData.children.length > 0) {
        return;
      }

      const response = yield call(getProvinceData, payload);

      if (!response.error) {
        selectData.loading = false;
        selectData.children = yield response.map(item => ({
          label: item.areaName,
          value: item.areaId,
          pid: item.areaPid,
          isLeaf: item.areaLevel === 3,
        }));

        // 选择节点无value熟悉则为根节点
        if (!selectData.value) {
          yield put({
            type: 'save',
            payload: {
              provinceData: selectData.children,
            },
          });
        } else {
          yield put({
            type: 'save',
            payload: {
              provinceData: [...provinceData],
            },
          });
        }

        LocalCache.set('areaInfo', provinceData);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
