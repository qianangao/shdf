import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import { downloadExcelFile } from '@/utils';
import moment from 'moment';
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
  getMeetingList,
  addMeeting,
  getMeetingDetail,
  updateMeeting,
  getEngineeringBanPublishList,
  getRelevancyBanPublishList,
  relationEngineering,
  getEngineeringKeyPersonList,
  getRelevancyPersonList,
  getEngineeringKeyInstitutionsList,
  getRelevancyInstitutionsList,
  getEngineeringClueList,
  getRelevancyClueList,
  getInfoAnList,
  addInfoAn,
  getInfoDetail,
  updateInfoAn,
  releaseInfoAn,
  getInfoStatistics,
  addEngineData,
  getEngineList,
  deleteMeeting,
  exportMeeting,
} from './service';

const Model = {
  namespace: 'defenseEngineering',
  state: {
    engineeringTree: [],
    loading: false,
    tableRef: {},
    meetingTableRef: {},
    projectId: '',
    projectPid: '',
    yearOrtot: 'null',
    taskId: '',
    engineeringForm: {},
    projectProvinceEntityList: [],
    projectTemporaryProvinceEntityList: [],
    provinceData: [],
    feedListData: [],
    stageListData: [],
    summaryListData: [],
    taskProgressList: [],
    head: [],
    infoAnListData: {},
    infoStatistics: {},
    infnAnObj: {},
    status: '',
  },

  effects: {
    *getMeetingList({ payload, resolve }, { call, put, select }) {
      const projectPid = yield select(state => state.defenseEngineering.projectPid);
      const params = {
        ...payload,
        projectPid,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };

      const { startTime } = params;

      if (startTime && startTime.length === 2) {
        params.startTime = moment(startTime[0]).format('YYYY-MM-DD');
        params.endTime = moment(startTime[1]).format('YYYY-MM-DD');
      }
      delete params.current;
      const response = yield call(getMeetingList, params);
      if (!response.error) {
        const result = formatPageData(response.result);
        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            status: response.status,
          },
        });
      }
    },
    *getEngineeringBanPublishList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getEngineeringBanPublishList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getRelevancyBanPublishList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getRelevancyBanPublishList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getEngineeringKeyPersonList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getEngineeringKeyPersonList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getRelevancyPersonList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getRelevancyPersonList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getEngineeringKeyInstitutionsList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getEngineeringKeyInstitutionsList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getRelevancyInstitutionsList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getRelevancyInstitutionsList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getEngineeringClueList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getEngineeringClueList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getRelevancyClueList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getRelevancyClueList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },

    *deleteMeeting({ payload, resolve }, { call, put }) {
      const meetingId = payload.toString();
      const response = yield call(deleteMeeting, meetingId);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');

        yield put({
          type: 'meetingTableReload',
        });
      }
    },
    *exportMeeting({ payload, resolve }, { call, put }) {
      const response = yield call(exportMeeting, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('上报成功！');
        yield put({
          type: 'meetingTableReload',
        });
      }
    },
    *getMeetingDetail({ payload, resolve }, { call }) {
      const response = yield call(getMeetingDetail, payload);
      if (!response.error) {
        response.secrecyLevel += '';
        resolve && resolve(response);
      }
    },
    *relationEngineering({ payload, resolve }, { call, put }) {
      const response = yield call(relationEngineering, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('数据关联成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addMeeting({ payload, resolve }, { call, put }) {
      const response = yield call(addMeeting, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'meetingTableReload',
        });
      }
    },

    *updateMeeting({ payload, resolve }, { call, put }) {
      const response = yield call(updateMeeting, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'meetingTableReload',
        });
      }
    },

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
            projectId: response.length && response[0].key,
            projectPid: response.length && response[0].key,
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
      const projectId = yield select(state => state.defenseEngineering.projectId);
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
      const projectId = yield select(state => state.defenseEngineering.projectId);
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
        const stageListData = [];
        const summaryListData = [];
        response.feedbackRequireList.forEach(item => {
          if (item.feedbackType === 0) {
            summaryListData.push(item);
          } else {
            stageListData.push(item);
          }
        });
        yield put({
          type: 'save',
          payload: {
            taskId: payload.taskId,
            summaryListData,
            stageListData,
            feedListData: response.feedbackRequireList,
            taskProgressList: response.taskProgressList,
            head: response.head,
          },
        });
      }
    },

    *deployProjectTaskList({ payload, resolve }, { call, put, select }) {
      const projectId = yield select(state => state.defenseEngineering.projectId);
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
      const taskId = yield select(state => state.defenseEngineering.taskId);
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
          projectPid: payload.projectPid === 'null' ? payload.projectId : payload.projectPid,
          yearOrtot: payload.projectPid,
        },
      });
      yield put({
        type: 'queryEngineeringData',
      });
      yield put({
        type: 'getEngineList',
      });
      yield put({
        type: 'getInfoStatistics',
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
    //= ============================================信息报送========================================
    *getInfoAnList({ payload, resolve }, { call, put, select }) {
      const projectId = yield select(state => state.defenseEngineering.projectId);
      const projectPid = yield select(state => state.defenseEngineering.projectPid);
      const params = {
        ...payload,
        currentPage: payload === undefined ? 1 : payload.current,
        pageSize: payload === undefined ? 10 : payload.pageSize,
        projectId: projectPid === projectId ? undefined : projectId,
        projectPid,
      };

      const response = yield call(getInfoAnList, params);
      if (!response.error) {
        const { records, current, total } = response;
        const result = {
          data: records,
          page: current,
          pageSize: 10,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            infoAnListData: result,
          },
        });
      }
    },
    *addInfoAn({ payload, resolve }, { call, put }) {
      const response = yield call(addInfoAn, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功!');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getInfoDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getInfoDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            infnAnObj: response,
          },
        });
      }
    },
    *updateInfoAn({ payload, resolve }, { call, put }) {
      const response = yield call(updateInfoAn, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *releaseInfoAn({ payload, resolve }, { call, put }) {
      const response = yield call(releaseInfoAn, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('发布成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    // 信息数据统计
    *getInfoStatistics({ payload, resolve }, { call, select }) {
      const projectId = yield select(state => state.defenseEngineering.projectId);
      const projectPid = yield select(state => state.defenseEngineering.projectPid);
      const params = {
        ...payload,
        currentPage: 1,
        pageSize: 10,
        projectId: projectPid === projectId ? undefined : projectId,
        projectPid,
      };
      const response = yield call(getInfoStatistics, params);
      if (!response.error) {
        const result = {
          data: response,
          page: 1,
          pageSize: 10,
          success: true,
          total: response.length,
        };

        resolve && resolve(result);
      }
    },
    // 信息数据统计
    *getInfoStatisticsData({ resolve }, { call, select }) {
      const projectId = yield select(state => state.defenseEngineering.projectId);
      const projectPid = yield select(state => state.defenseEngineering.projectPid);
      const params = {
        projectId,
        projectPid,
      };
      const response = yield call(getInfoStatistics, params);
      resolve && resolve(response);
    },
    //= ======================================工程数据================================================

    *addEngineData({ payload, resolve }, { call, put }) {
      const response = yield call(addEngineData, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功!');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getEngineList({ payload, resolve }, { call, select }) {
      const projectId = yield select(state => state.defenseEngineering.projectId);
      const projectPid = yield select(state => state.defenseEngineering.projectPid);
      const params = {
        ...payload,
        currentPage: payload === undefined ? 1 : payload.current,
        pageSize: payload === undefined ? 10 : payload.pageSize,
        projectId: projectPid === projectId ? undefined : projectId,
        projectPid,
      };
      const response = yield call(getEngineList, params);

      if (!response.error) {
        const { records, current, total } = response;
        const result = {
          data: records,
          page: current,
          pageSize: 10,
          success: true,
          total,
        };

        resolve && resolve(result);
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
    meetingTableReload(state) {
      const meetingTableRef = state.meetingTableRef || {};
      setTimeout(() => {
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        meetingTableRef.current && meetingTableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};

export default Model;
