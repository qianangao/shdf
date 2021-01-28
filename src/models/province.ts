import { getProvinceData } from '@/services/province';

const findData = (idArr, data) => {
  if (idArr.length === 1) {
    return { children: data };
  }

  let tempData = { children: data };
  let tempId = idArr[0];

  for (let i = 1; i < idArr.length; i++) {
    tempId = `${tempId}-${idArr[i]}`;
    // eslint-disable-next-line no-loop-func
    tempData = tempData.children.find(item => item.value === tempId);
    if (!tempData) break;
  }

  return tempData;
};

const Model = {
  namespace: 'globalProvince',
  state: {
    provinceData: [],
  },
  effects: {
    *getData({ payload }, { call, put, select }) {
      const provinceData = yield select(state => state.globalProvince.provinceData);
      const idArr = payload.id.split('-');
      const selectData = findData(idArr, provinceData);

      if (selectData && selectData.children && selectData.children.length > 0) {
        return;
      }

      selectData.loading = true;
      const response = yield call(getProvinceData, payload);

      if (!response.error) {
        selectData.loading = false;
        selectData.children = yield response.map(item => ({
          label: item.areaName,
          value: item.areaId,
          isLeaf: idArr.length === 3,
        }));

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
