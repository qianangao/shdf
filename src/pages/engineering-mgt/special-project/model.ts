import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import { downloadExcelFile } from '@/utils';
import moment from 'moment';
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
  deployChildrenTaskList,
  deleteChildrenTaskList,
  FeedbackRequestList,
  exportLog,
  addFeedback,
  feedbackDetail,
  provinceData,
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    feedDetailTableRef: {},
    taskListData: {},
    feedListData: [],
    taskProgressList: [],
    feedData: {},
    FeedbackData: [],
    feedbackDetailData: [],
    actionForm: {},
    actionId: '',
    taskId: '',
    taskStatus: '',
    actionTree: [],
    loading: false,
    head: {},
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
          type: 'tableReload',
        });
      }
    },

    *deleteChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(deleteChildrenTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *deployChildrenTaskList({ payload, resolve }, { call, put, select }) {
      const actionId = yield select(state => state.specialAction.actionId);
      const taskStatus = yield select(state => state.specialAction.taskStatus);
      const response = yield call(deployChildrenTaskList, { ...payload, actionId, taskStatus });
      if (!response.error) {
        resolve && resolve(response);
        message.success('下发成功！');
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
            taskStatus: response.taskState,
            taskId: payload.taskId,
            feedListData: response.feedbackRequireList,
            taskProgressList: response.taskProgressList,
            head: response.head,
          },
        });
      }
    },

    *addFeedbackRequest({ payload, resolve }, { call }) {
      const response = yield call(addFeedbackRequest, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
      }
    },
    *deleteFeedbackRequest({ payload, resolve }, { call }) {
      const response = yield call(deleteFeedbackRequest, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');
      }
    },

    *FeedbackRequestList({ payload, resolve }, { call, put, select }) {
      const taskId = yield select(state => state.specialAction.taskId);
      const params = {
        ...payload,
        taskId,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(FeedbackRequestList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            feedData: result,
          },
        });
      }
    },

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
        message.success('删除成功！');
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
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const response = yield call(getSpecialActionTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            actionTree: response,
            loading: false,
            actionId: response.length && response[0].key,
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

    *exportLog(_, { call, select }) {
      const taskId = yield select(state => state.specialAction.taskId);
      const response = yield call(exportLog, { taskId });
      if (!response.error) {
        yield downloadExcelFile(response, `任务进度列表${moment().format('MM-DD HH:mm:ss')}`);
      }
    },
    *provinceData({ resolve }, { call }) {
      const response = yield call(provinceData);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *addFeedback({ payload, resolve }, { call, put }) {
      const response = yield call(addFeedback, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('反馈成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *feedbackDetail({ payload, resolve }, { call, put }) {
      const response = yield call(feedbackDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            feedbackDetailData: response,
          },
        });
      }
    },
    *selectFeedbackData({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          FeedbackData: payload,
        },
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
