import { message } from 'antd';
import {
  getChildrenTaskList,
  addChildrenTaskList,
  editSpecialAction,
  addSpecialAction,
  addAnnualSpecialAction,
  getSpecialAction,
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    taskListData: {},
  },
  effects: {
    *getChildrenTaskList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      delete params.current;
      const response = yield call(getChildrenTaskList, params);
      if (!response.error) {
        // const { items, currentPage, totalNum } = response;

        const result = {
          data: response.records,
          page: response.pages,
          pageSize: payload.pageSize,
          success: true,
          total: response.total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            taskListData: result,
          },
        });
      }
    },

    *addChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(addChildrenTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *editSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(editSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(addSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addAnnualSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(addAnnualSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *getSpecialAction({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      delete params.current;
      const response = yield call(getSpecialAction, params);
      if (!response.error) {
        // const { items, currentPage, totalNum } = response;

        const result = {
          data: response.records,
          page: response.pages,
          pageSize: payload.pageSize,
          success: true,
          total: response.total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            taskListData: result,
          },
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
