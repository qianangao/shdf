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
  deleteSpecialAction,
  findChildrenTaskDetail,
  updateChildrenTaskList,
  addFeedbackRequest,
  deleteFeedbackRequest,
  // FeedbackRequestList
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    // feedTableRef:{},
    // treeRef: {},
    taskListData: {},
    feedListData: [],
    // historyInfo: [],
    actionForm: {},
    actionId: '',
    actionTree: [],
    loading: false,
    // actionList: [],
  },
  effects: {
    *getChildrenTaskList({ payload, resolve }, { call, put, select }) {
      const actionId = yield select(state => state.specialAction.actionId);
      const params = {
        ...payload,
        actionId,
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
            // actionId: payload.actionId,
          },
        });
        // yield put({
        //   type: 'tableReload',
        // });
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
        type: 'getSpecialAction',
      });
      yield put({
        type: 'tableReload',
      });
    },

    *addChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(addChildrenTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'save',
          payload: {
            taskListData: response,
          },
        });
        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(updateChildrenTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'save',
          payload: {
            taskListData: response,
          },
        });
        yield put({
          type: 'tableReload',
        });
      }
    },

    *findChildrenTaskDetail({ payload, resolve }, { call, put }) {
      const response = yield call(findChildrenTaskDetail, payload);
      if (!response.error) {
        response.secrecyLevel += '';
        response.taskState += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            feedListData: response.feedbackRequireList,
          },
        });
      }
    },

    *addFeedbackRequest({ payload, resolve }, { call }) {
      const response = yield call(addFeedbackRequest, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        // yield put({
        //   type: 'feedTableReload',
        // });
      }
    },
    *deleteFeedbackRequest({ payload, resolve }, { call }) {
      const response = yield call(deleteFeedbackRequest, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');
        // yield put({
        //   type: 'feedTableReload',
        // });
      }
    },

    // *FeedbackRequestList({ payload, resolve }, { call, put }) {
    //   const response = yield call(FeedbackRequestList, payload);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //     const result = formatPageData(response);
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         feedListData: result,
    //       },
    //     });
    //   }
    // },

    *editSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(editSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'getSpecialActionTree',
        });
        yield put({
          type: 'save',
          payload: {
            actionForm: payload,
            loading: true,
          },
        });
      }
    },
    *addSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(addSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'save',
          payload: {
            loading: true,
          },
        });
        yield put({
          type: 'getSpecialActionTree',
        });
      }
    },
    *addAnnualSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(addAnnualSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'save',
          payload: {
            loading: true,
          },
        });
        yield put({
          type: 'getSpecialActionTree',
        });
      }
    },

    *deleteSpecialAction({ payload, resolve }, { call, put }) {
      const response = yield call(deleteSpecialAction, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            loading: true,
          },
        });
        yield put({
          type: 'getSpecialActionTree',
        });
      }
    },

    *getSpecialAction({ resolve }, { call, put, select }) {
      const actionId = yield select(state => state.specialAction.actionId);
      const response = yield call(getSpecialAction, { actionId });
      if (!response.error) {
        response.secrecyLevel += '';
        response.actionId += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            actionForm: response,
            actionId,
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
            actionTree: response,
            loading: false,
            actionId: response[0].key,
          },
        });
        yield put({
          type: 'getSpecialAction',
        });
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
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
    // feedTableReload(state) {
    //   const feedTableRef = state.feedTableRef || {};
    //   setTimeout(() => {
    //     // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
    //     feedTableRef.current && feedTableRef.current.reloadAndRest();
    //   }, 0);
    //   return { ...state };
    // },
  },
};

export default Model;
