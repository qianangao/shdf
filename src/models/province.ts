import { getProvinceData } from '@/services/province';
import { LocalCache } from '@/utils/storage';

const Model = {
  namespace: 'globalProvince',
  state: {
    provinceData: [],
  },
  effects: {
    *getData({ payload }, { call, put, select }) {
      if (payload && payload.areaInfo && payload.areaInfo.length > 0) {
        yield put({
          type: 'save',
          payload: {
            provinceData: payload.areaInfo,
          },
        });
        return;
      }
      const provinceData = yield select(
        (state: { globalProvince: { provinceData: any } }) => state.globalProvince.provinceData,
      );
      let selectData: never[] = [];

      const response = yield call(getProvinceData, payload);
      if (!response.error) {
        if (payload && payload.areaPid) {
          selectData = yield response.map((item: any) => ({
            label: item.areaName,
            value: item.areaId,
            pid: item.areaPid,
            isLeaf: item.areaLevel === 3,
          }));
          const temp: any[] = [];
          const childTemp: any[] = [];
          provinceData.forEach((item: any) => {
            if (item.value === payload.areaPid) {
              temp.push({ ...item, children: selectData });
            } else if (item.value === payload.mPId) {
              item.children &&
                item.children.forEach((child: { value: any }) => {
                  if (child.value === payload.areaPid) {
                    childTemp.push({ ...child, children: selectData });
                  } else {
                    childTemp.push(child);
                  }
                });
              temp.push({ ...item, children: childTemp });
            } else {
              temp.push(item);
            }
          });
          yield put({
            type: 'save',
            payload: {
              provinceData: [...temp],
            },
          });
        } else {
          selectData = yield response.map((item: { areaName: any; areaId: any }) => ({
            label: item.areaName,
            value: item.areaId,
            isLeaf: false,
          }));
          yield put({
            type: 'save',
            payload: {
              provinceData: selectData,
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
