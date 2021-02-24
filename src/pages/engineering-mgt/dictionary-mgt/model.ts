// import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import {
  getEngineeringTree,
  getEngineeringList,
  queryEngineeringData,
  deleteEngineeringData,
} from './service';

const Model = {
  namespace: 'dictionaryMgt',
  state: {
    engineeringTree: [],
    loading: false,
    tableRef: {},
    actionId: '',
    enginerringForm: {},
  },

  effects: {
    *getEngineeringTree({ payload, resolve }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const response = yield call(getEngineeringTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            engineeringTree: response,
            loading: false,
            actionId: response[0].key,
          },
        });
        yield put({
          type: 'queryEngineeringData',
        });
        yield put({
          type: 'tableReload',
        });
      }
    },

    *getEngineeringList({ payload, resolve }, { call, select }) {
      const actionId = yield select(state => state.dictionaryMgt.actionId);
      const params = {
        ...payload,
        actionId,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getEngineeringList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        // yield put({
        // type: 'save',
        // payload: {
        //     taskListData: result,
        //     // actionId: payload.actionId,
        // },
        // });
      }
    },
    *deleteEngineeringData({ payload, resolve }, { call, put }) {
      const response = yield call(deleteEngineeringData, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            loading: true,
          },
        });
        yield put({
          type: 'getEngineeringTree',
        });
      }
    },

    *queryEngineeringData({ resolve }, { call, put, select }) {
      const actionId = yield select(state => state.dictionaryMgt.actionId);
      const response = yield call(queryEngineeringData, { actionId });
      if (!response.error) {
        response.secrecyLevel += '';
        response.actionId += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            engineeringForm: response,
          },
        });
      }
    },

    *getListTable({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          actionId: payload.actionId,
        },
      });
      yield put({
        type: 'queryEngineeringData',
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
