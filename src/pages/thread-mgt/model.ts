import { message } from 'antd';
import { formatPageData } from '@/utils';
import {
  getAllClues,
  commitCueAssociation,
  getOperatingLogList,
  transferAssociation,
  hostAssociation,
  getProcessInfoList,
  commitExamineClue,
  authorizeClue,
  addClue,
  editClue,
  getCode,
  deleteClue,
  finishClue,
  feedbackClue,
} from './service';

const Model = {
  namespace: 'emClueManagement',
  state: {
    clueListData: {},
    logListData: {},
    processListData: [],
    code: {},
    tableRef: {},
  },
  effects: {
    *getAllClues({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getAllClues, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            clueListData: result,
          },
        });
      }
    },
    *getCode({ payload, resolve }, { call, put }) {
      const response = yield call(getCode, payload);
      if (!response.error) {
        resolve && resolve(response);

        yield put({
          type: 'save',
          payload: {
            code: response,
          },
        });
      }
    },
    *getOperatingLogList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getOperatingLogList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            logListData: result,
          },
        });
      }
    },
    *getProcessInfoList({ payload, resolve }, { call, put }) {
      const response = yield call(getProcessInfoList, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            processListData: response,
          },
        });
      }
    },
    *addClues({ payload, resolve }, { call, put }) {
      const response = yield call(addClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *editClue({ payload, resolve }, { call, put }) {
      const response = yield call(editClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteClue({ payload, resolve }, { call, put }) {
      const response = yield call(deleteClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *feedbackClue({ payload, resolve }, { call, put }) {
      const response = yield call(feedbackClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索反馈成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *finishClue({ payload, resolve }, { call, put }) {
      const response = yield call(finishClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索结束成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *commitCueAssociation({ payload, resolve }, { call, put }) {
      const response = yield call(commitCueAssociation, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索串并联成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *transferAssociation({ payload, resolve }, { call, put }) {
      const response = yield call(transferAssociation, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('转办成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *hostAssociation({ payload, resolve }, { call, put }) {
      const response = yield call(hostAssociation, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('主办成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *commitExamineClue({ payload, resolve }, { call, put }) {
      const response = yield call(commitExamineClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('提交审批成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *authorizeClue({ payload, resolve }, { call, put }) {
      const response = yield call(authorizeClue, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('线索授权成功！');
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
  },
};
export default Model;
