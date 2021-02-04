import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import {
  getChildrenTaskList,
  addChildrenTaskList,
  editSpecialAction,
  addSpecialAction,
  addAnnualSpecialAction,
  getSpecialAction,
  getSpecialActionTree,
  getHistoryInfoAction,
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    taskListData: {},
    historyInfo: [],
    actionForm: {},
    actionList: [],
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
        const result = formatPageData(response);

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
      const response = yield call(getSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            // actionForm: result,
            actionForm: {
              actionName: '行动名称',
              displayCode: '显示编码/行动编号',
              secrecyLevel: '保密等级',
              startDate: '2020-12-02',
              endDate: '2020-12-30',
              actionDescription: '行动描述',
              actionYear: '2021',
            },
          },
        });
      }
    },

    *getSpecialActionTree({ payload, resolve }, { call }) {
      const response = yield call(getSpecialActionTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        const arr = [];
        response.forEach(item => {
          arr.push({ key: item.key, item: item.title });
        });
        yield put({
          type: 'save',
          payload: {
            actionList: arr,
          },
        });
      }
    },

    *getHistoryInfoAction({ resolve }, { call }) {
      const response = yield call(getHistoryInfoAction);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            historyInfo: response,
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
