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
  getInfoAnList,
  addInfoAn,
  getInfoDetail,
  updateInfoAn,
  releaseInfoAn,
  getInfoStatistics,
  addEngineData,
  getEngineList
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
    provinceData: [],
    feedListData: [],
    taskProgressList: [],
    head: [],
    infoAnListData:{},
    infoStatistics:{},
    infnAnObj:{}
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
      const projectId = yield select(state => state.specialAction.projectId);
      // const taskStatus = yield select(state => state.specialAction.taskStatus);
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

    *exportLog(_, { call, select }) {
      const taskId = yield select(state => state.specialAction.taskId);
      const response = yield call(exportLog, { taskId });
      if (!response.error) {
        yield downloadExcelFile(response, `任务进度列表${moment().format('MM-DD HH:mm:ss')}`);
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
     //=============================================信息报送========================================
     *getInfoAnList({ payload, resolve }, { call, put ,select}) {
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const params = {
        ...payload,
        currentPage: payload==undefined?1:payload.current,
        pageSize:payload==undefined?10:payload.pageSize,
        projectId
      };
  
      const response = yield call(getInfoAnList, params);
      if (!response.error) {
        // const { items, currentPage, totalNum } = response;
        const { records, current, total } = response;
        const result = {
          data: records,
          page: current,
          pageSize:10,
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
    *getInfoDetail({ payload, resolve }, { call, put}) {
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
    *getInfoStatistics({ payload, resolve }, { call, put,select }) {
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const params = {
        ...payload,
        currentPage: 1,
        pageSize: 10,
        projectId
      };
      const response = yield call(getInfoStatistics, params);
      if (!response.error) {
        const result = {
          data: response,
          page: 1,
          pageSize:10,
          success: true,
          total:response.length
        };

        resolve && resolve(result);

        // yield put({
        //   type: 'save',
        //   payload: {
        //     infoStatistics: response,
        //   },
        // });
      }
    },
     // 信息数据统计
     *getInfoStatisticsData({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getInfoStatistics, params);
        resolve && resolve(response);
      
    },
    //=======================================工程数据================================================
    
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
    *getEngineList({ payload, resolve }, { call ,put,select}) {
      console.log('🚀 ~ file: model.ts ~ line 399 ~ *getEngineList ~ payload', payload)
      const projectId = yield select(state => state.dictionaryMgt.projectId);
      const params = {
        ...payload,
        currentPage: payload==undefined?1:payload.current,
        pageSize:payload==undefined?10:payload.pageSize,
        projectId
      };
      const response = yield call(getEngineList, params);

      if (!response.error) {
        // const { items, currentPage, totalNum } = response;
        const { records, current, total } = response;
        const result = {
          data: records,
          page: current,
          pageSize:10,
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
  },
};

export default Model;
