import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import { downloadExcelFile } from '@/utils';
import {
  getEngineeringTree,
  getEngineeringList,
  queryEngineeringData,
  deleteEngineeringData,
  addEngineering,
  editEngineering,
  addProjectTaskList,
  projectTaskDetail,
  deleteProjectTask,
  updateProjectTaskList,
  exportLog,
  deployProjectTaskList,
  provinceData,
  addFeedback,
  addTempProvince,
} from './service';

const Model = {
  namespace: 'dictionaryMgt',
  state: {
    engineeringTree: [],
    loading: false,
    tableRef: {},
    projectId: '',
    taskId: '',
    engineeringForm: {},
    projectProvinceEntityList: [],
    projectTemporaryProvinceEntityList: [],
    provinceData: [],
    feedListData: [],
    taskProgressList: [],
    head: [],
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
            projectId: response[0].key,
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

    *addEngineering({ payload, resolve }, { call, put }) {
      const response = yield call(addEngineering, payload);
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
          type: 'getEngineeringTree',
        });
      }
    },
    *editEngineering({ payload, resolve }, { call, put }) {
      const response = yield call(editEngineering, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
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

    *getEngineeringList({ payload, resolve }, { call, select }) {
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const params = {
        ...payload,
        projectId,
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
        //     // projectId: payload.projectId,
        // },
        // });
      }
    },

    *addProjectTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(addProjectTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *queryEngineeringData({ resolve }, { call, put, select }) {
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const response = yield call(queryEngineeringData, { projectId });
      if (!response.error) {
        response.secrecyLevel += '';
        response.projectId += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            engineeringForm: response,
            projectProvinceEntityList: response.projectProvinceEntityList,
            projectTemporaryProvinceEntityList: response.projectTemporaryProvinceEntityList,
          },
        });
      }
    },

    *updateProjectTaskList({ payload, resolve }, { call, put }) {
      const response = yield call(updateProjectTaskList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteProjectTask({ payload, resolve }, { call, put }) {
      const response = yield call(deleteProjectTask, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *projectTaskDetail({ payload, resolve }, { call, put }) {
      const response = yield call(projectTaskDetail, payload);
      if (!response.error) {
        response.secrecyLevel += '';
        response.taskStatus += '';
        response.projectId += '';
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            taskId: payload.taskId,
            feedListData: response.feedbackRequireList,
            taskProgressList: response.taskProgressList,
            head: response.head,
          },
        });
      }
    },

    *deployProjectTaskList({ payload, resolve }, { call, put, select }) {
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const response = yield call(deployProjectTaskList, { ...payload, projectId });
      if (!response.error) {
        resolve && resolve(response);
        message.success('下发成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *provinceData({ resolve }, { call }) {
      const response = yield call(provinceData);
      if (!response.error) {
        resolve && resolve(response);
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
    *exportLog(_, { call, select }) {
      const taskId = yield select(state => state.dictionaryMgt.taskId);
      const response = yield call(exportLog, { taskId });
      if (!response.error) {
        yield downloadExcelFile(response, `任务进度列表${moment().format('MM-DD HH:mm:ss')}`);
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
    *addTempProvince({ payload, resolve }, { call, put }) {
      const response = yield call(addTempProvince, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'getEngineeringTree',
        });
      }
    },

    *getListTable({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          projectId: payload.projectId,
        },
      });
      yield put({
        type: 'queryEngineeringData',
      });
      yield put({
        type: 'tableReload',
      });
    },

    *selectProvinceData({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          provinceData: payload,
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
