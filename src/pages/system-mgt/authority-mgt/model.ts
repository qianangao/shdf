import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import {
  addAuth,
  updateAuth,
  deleteAuth,
  getAuthList,
  getAuthTree,
  getAuthDetail,
} from './service';

const Model = {
  namespace: 'authorityMgt',
  state: {
    loading: false,
    authTree: [],
    tableRef: {},
    parentId: '',
  },
  effects: {
    *getAuthTree({ payload, resolve }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const response = yield call(getAuthTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            authTree: response.records,
            loading: false,
          },
        });
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getAuthDetail({ payload, resolve }, { call }) {
      const response = yield call(getAuthDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *getListTable({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          parentId: payload.parentId,
        },
      });
      yield put({
        type: 'tableReload',
      });
    },

    *getAuthList({ payload, resolve }, { call, select }) {
      const parentId = yield select(state => state.authorityMgt.parentId);
      const params = {
        ...payload,
        parentId,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getAuthList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        // yield put({
        //   type: 'save',
        //   payload: {
        //     roleListData: result,
        //   },
        // });
      }
    },
    *addAuth({ payload, resolve }, { call, put }) {
      const response = yield call(addAuth, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'getAuthTree',
        });
      }
    },
    *updateAuth({ payload, resolve }, { call, put }) {
      const response = yield call(updateAuth, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'getAuthTree',
        });
      }
    },
    *deleteAuth({ payload }, { call, put }) {
      const response = yield call(deleteAuth, payload);
      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'getAuthTree',
        });
      }
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
