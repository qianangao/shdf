import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import { getList, add, update, deletekw, usekw } from './service';

const Model = {
  namespace: 'keywrod',
  state: {
    dataList: {},
    tableRef: {},
  },
  effects: {
    *getList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *add({ payload, resolve }, { call, put }) {
      const response = yield call(add, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *update({ payload, resolve }, { call, put }) {
      const response = yield call(update, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deletekw({ payload }, { call, put }) {
      const response = yield call(deletekw, payload);
      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *usekw({ payload, resolve }, { call, put }) {
      const response = yield call(usekw, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'tableReload',
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
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};

export default Model;
