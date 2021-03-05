import { getAnaStatistics, getSpecialActionTree, getEngineeringTree } from './service';

const Model = {
  namespace: 'statistical',
  state: {
    loading: false,
    specialAction: {},
    engineering: {},
  },
  effects: {
    *getAnaStatistics({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        // specialActionIds: [123, 456],
        // regionCode: '100000',
      };
      const response = yield call(getAnaStatistics, params);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *getSpecialActionTree({ payload, resolve }, { call, put }) {
      const response = yield call(getSpecialActionTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            specialAction: response,
          },
        });
      }
    },
    *getEngineeringTree({ payload, resolve }, { call, put }) {
      const response = yield call(getEngineeringTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            engineering: response,
          },
        });
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
