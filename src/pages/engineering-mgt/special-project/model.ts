import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import { downloadXlsFile } from '@/utils';
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
  // feedbackDetail
} from './service';

const Model = {
  namespace: 'specialAction',
  state: {
    tableRef: {},
    feedDetailTableRef: {},
    // treeRef: {},
    taskListData: {},
    feedListData: [],
    taskProgressList: [],
    feedData: {},
    FeedbackData: [],
    feedbackDetailData: [],
    // historyInfo: [],
    actionForm: {},
    actionId: '',
    taskId: '',
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
        // yield put({
        //   type: 'save',
        //   payload: {
        //     taskListData: response,
        //   },
        // });
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

    *deployChildrenTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(deployChildrenTaskList, payload);
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
        response.taskProgressList = [
          {
            province: '省份/进度',
            stage1: '阶段反馈1',
            stage2: '阶段反馈2',
            stage3: '阶段反馈3',
            stage4: '阶段反馈4',
          },
          {
            province: '北京',
            stage1: '已反馈',
            feedbackLogId1: 2,
            stage2: '已反馈',
            feedbackLogId2: 5,
            stage3: '未反馈',
            feedbackLogId3: '',
            stage4: '未反馈',
            feedbackLogId4: '',
          },
          {
            province: '陕西',
            stage1: '未反馈',
            feedbackLogId1: '',
            stage2: '未反馈',
            feedbackLogId2: '',
            stage3: '未反馈',
            feedbackLogId3: '',
            stage4: '未反馈',
            feedbackLogId4: '',
          },
          {
            province: '河南',
            stage1: '未反馈',
            feedbackLogId1: '',
            stage2: '未反馈',
            feedbackLogId2: '',
            stage3: '未反馈',
            feedbackLogId3: '',
            stage4: '未反馈',
            feedbackLogId4: '',
          },
          {
            province: '四川',
            stage1: '未反馈',
            feedbackLogId1: '',
            stage2: '未反馈',
            feedbackLogId2: '',
            stage3: '未反馈',
            feedbackLogId3: '',
            stage4: '未反馈',
            feedbackLogId4: '',
          },
          {
            province: '江苏',
            stage1: '已反馈',
            feedbackLogId1: 1,
            stage2: '已反馈',
            feedbackLogId2: 3,
            stage3: '已反馈',
            feedbackLogId3: 4,
            stage4: '未反馈',
            feedbackLogId4: '',
          },
        ];
        yield put({
          type: 'save',
          payload: {
            taskId: payload.taskId,
            feedListData: response.feedbackRequireList,
            taskProgressList: response.taskProgressList,
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

    *exportLog(_, { call, select }) {
      const taskId = yield select(state => state.specialAction.taskId);
      const response = yield call(exportLog, taskId);
      if (!response.error) {
        yield downloadXlsFile(response, `任务进度列表${moment().format('MM-DD HH:mm:ss')}`);
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
      const response = yield call(feedbackDetail, payload.feedbackLogId);
      if (!response.error) {
        // const result = formatPageData(response);
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            feedbackDetailData: response,
            // actionId: payload.actionId,
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
    feedTableReload(state) {
      const feedTableRef = state.feedTableRef || {};
      setTimeout(() => {
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        feedTableRef.current && feedTableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};

export default Model;
