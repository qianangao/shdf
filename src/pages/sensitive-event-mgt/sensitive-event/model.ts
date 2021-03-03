import { message } from 'antd';
import { downloadXlsFile } from '@/utils';
import { getReceivingCode } from '@/pages/synergy-office/receiving-mgt/service';
import moment from 'moment';
import {
  getList,
  getCaseHandleList,
  getDetail,
  del,
  authorize,
  getAuthorize,
  add,
  updateCase,
  applyCase,
  addCaseHandle,
  recall,
  recordApproval,
  getRecordDetail,
  supervise,
  completed,
  evaluateFeedback,
  evaluate,
  recallSupervise,
  getSuperviseDetail,
  templateDownload,
  importCase,
  clueRelation,
  exportCase,
} from './service';

const Model = {
  namespace: 'sensitiveMgt',
  state: {
    listData: {},
    receivingReadListData: {},
    memberListData: {},
    detailData: {},
    recordDetailData: {},
    authorizeData: {},
    caseFileData: {},
    trendsDetailData: {},
    tableRef: {},
    tableHandleRef: {},
    tableClubRef: {},
    tableFileRef: {},
    selectedOrgId: undefined,
  },
  effects: {
    *getList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getList, params);

      if (!response.error) {
        const { records, current, total } = response;

        const result = {
          data: records,
          page: current,
          pageSize: payload.pageSize,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            listData: result,
          },
        });
      }
    },
    *getClubList({ payload, resolve }, { call, put }) {
      if (payload.id === '') {
        resolve && resolve({});
        return;
      }
      const response = yield call(getDetail, payload);
      if (!response.error) {
        const { clueList } = response;
        if (!clueList || clueList == null) {
          resolve && resolve({});
        } else {
          const result = {
            data: clueList,
            page: 1,
            pageSize: 100,
            success: true,
            total: clueList.length,
          };
          resolve && resolve(result);
        }
        yield put({
          type: 'save',
          payload: {
            caseDetailClueList: clueList,
          },
        });
      }
    },
    *getCaseHandleList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      if (payload.id === '') {
        resolve && resolve({});
        return;
      }
      const response = yield call(getCaseHandleList, params);

      if (!response.error) {
        const { page, file, current, totalNum } = response;

        const result = {
          data: page.records,
          files: file,
          page: current,
          pageSize: payload.pageSize,
          success: true,
          total: totalNum,
        };
        resolve && resolve(result);
      } else {
        resolve && resolve({});
      }
    },
    *getCaseHandleFile({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      if (payload.id === '') {
        resolve && resolve({});
        return;
      }
      const response = yield call(getCaseHandleList, params);

      if (!response.error) {
        const { file, current } = response;

        const result = {
          data: file,
          page: current,
          pageSize: file.length,
          success: true,
          total: file.length,
        };
        resolve && resolve(result);
      } else {
        resolve && resolve({});
      }
    },
    *getAuthorize({ payload, resolve }, { call, put }) {
      const response = yield call(getAuthorize, payload);
      if (!response.error) {
        resolve && resolve(response.data);
        yield put({
          type: 'save',
          payload: {
            authorizeData: response.data,
          },
        });
      }
    },
    *getDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getDetail, payload);

      if (!response.error) {
        response.fileList =
          response.fileList &&
          response.fileList.map(item => {
            return {
              url: item.url,
              uid: item.fileId,
              name: item.fileName,
              status: 'done',
            };
          });
        response.regionObj = { label: response.region, value: response.regionCode };
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailData: response,
          },
        });
      }
    },
    *update({ payload, resolve }, { call, put }) {
      const response = yield call(updateCase, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('案件修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *del({ payload, resolve }, { call, put }) {
      const response = yield call(del, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *selectOrgChange({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          selectedOrgId: payload,
        },
      });

      yield put({
        type: 'tableReload',
      });
    },
    *authorize({ payload, resolve }, { call, put }) {
      const response = yield call(authorize, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('授权成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *add({ payload, resolve }, { call, put }) {
      // 先获取编码
      const resCode = yield call(getReceivingCode, {});
      payload.caseCode = `MS${resCode}`;
      const response = yield call(add, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增案件成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addCaseHandle({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(addCaseHandle, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增案件办理成功！');
        yield put({
          type: 'tableHandleReload',
        });
        yield put({
          type: 'tableFileReload',
        });
      }
    },
    *clueRelation({ payload, resolve }, { call, put }) {
      const response = yield call(clueRelation, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索串并联成功！');
        yield put({
          type: 'tableClubReload',
        });
      }
    },
    *applyCase({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(applyCase, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('申请备案成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *recall({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(recall, payload);
      if (!response.error) {
        resolve && resolve(response.data);
        message.success('备案撤回成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *recordApproval({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(recordApproval, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('备案审批成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getRecordDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getRecordDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            recordDetailData: response,
          },
        });
      }
    },
    *supervise({ payload, resolve }, { call, put }) {
      const response = yield call(supervise, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'tableReload',
        });
      }
    },
    *completed({ payload, resolve }, { call, put }) {
      const response = yield call(completed, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'tableReload',
        });
      }
    },
    *evaluate({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(evaluate, payload);
      if (!response.error) {
        resolve && resolve(response.data);
        message.success('评价成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *evaluateFeedback({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(evaluateFeedback, payload);
      if (!response.error) {
        resolve && resolve(response.data);
        message.success('评价反馈成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *recallSupervise({ payload, resolve }, { call, put }) {
      // 先获取编码
      const response = yield call(recallSupervise, payload);
      if (!response.error) {
        resolve && resolve(response.data);
        message.success('备案撤回成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getSuperviseDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getSuperviseDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            recordDetailData: response,
          },
        });
      }
    },
    *templateDownload({ _ }, { call }) {
      const response = yield call(templateDownload);
      if (!response.error) {
        yield downloadXlsFile(response, `案件管理模板`);
      }
    },
    *exportCase({ _ }, { call }) {
      const response = yield call(exportCase);
      if (!response.error) {
        yield downloadXlsFile(response, `案件管理列表${moment().format('MM-DD HH:mm:ss')}`);
      }
    },
    *importCase({ payload, resolve }, { call, put }) {
      const formData = new FormData();
      formData.append('file', payload.file);
      const response = yield call(importCase, formData);
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
    tableHandleReload(state) {
      const tableHandleRef = state.tableHandleRef || {};
      setTimeout(() => {
        tableHandleRef.current && tableHandleRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
    tableFileReload(state) {
      const tableFileRef = state.tableFileRef || {};
      setTimeout(() => {
        tableFileRef.current && tableFileRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
    tableClubReload(state) {
      const tableClubRef = state.tableClubRef || {};
      setTimeout(() => {
        tableClubRef.current && tableClubRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
