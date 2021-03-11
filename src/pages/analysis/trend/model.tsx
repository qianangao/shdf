import {
  getAnaStatistics,
  getSpecialActionTree,
  getEngineeringTree,
  getTrendStatistics,
} from './service';

const Model = {
  namespace: 'trendStatistics',
  state: {
    loading: false,
    specialAction: [],
    engineering: [],
    analysisType: '1', // 标签类型
  },
  effects: {
    *getAnaStatistics({ payload, resolve }, { call }) {
      const params = {
        ...payload,
      };
      const response = yield call(getAnaStatistics, params);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *getTrendStatistics({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
      };
      const response = yield call(getTrendStatistics, params);
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
    *getTabsName({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          analysisType: payload.analysisType,
        },
      });
      yield put({
        type: 'tableReload',
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    tableReload(state) {
      const tableRef = state.tableRef || {};
      setTimeout(() => {
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
