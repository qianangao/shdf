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
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    // treeRef: {},
    taskListData: {},
    // historyInfo: [],
    actionForm: {},
    actionId: '',
    // actionList: [],
  },
  effects: {
    *getChildrenTaskList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
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
            actionId: payload.actionId,
          },
        });
        yield put({
          type: 'tableReload',
        });
      }
    },

    *addChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(addChildrenTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        // console.log("response.records",response.records);

        message.success('新增成功！');
        yield put({
          type: 'save',
          payload: {
            taskListData: response.records,
          },
        });
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
    *addSpecialAction({ payload, resolve }, { call }) {
      const response = yield call(addSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        // yield put({
        //   type: 'tableReload',
        // });
      }
    },
    *addAnnualSpecialAction({ payload, resolve }, { call }) {
      const response = yield call(addAnnualSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        // yield put({
        //   type: 'tableReload',
        // });
      }
    },

    *getSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(getSpecialAction, payload);
      if (!response.error) {
        response.secrecyLevel += '';
        response.actionId += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            actionForm: response,
          },
        });
      }
    },

    *getSpecialActionTree({ payload, resolve }, { call }) {
      const response = yield call(getSpecialActionTree, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },

    //   *getHistoryInfoAction({ resolve }, { call }) {
    //     const response = yield call(getHistoryInfoAction);
    //     if (!response.error) {
    //       resolve && resolve(response);
    //       yield put({
    //         type: 'save',
    //         payload: {
    //           historyInfo: response,
    //         },
    //       });
    //     }
    //   },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    tableReload(state) {
      // const treeRef = state.treeRef || {};
      const tableRef = state.tableRef || {};
      setTimeout(() => {
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        tableRef.current && tableRef.current.reloadAndRest();
        // treeRef.current && treeRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};

export default Model;
