import { downloadXlsFile } from '@/utils';
import { exportLog, getList, getUnReadNum, getNewNum } from './service';

const Model = {
  namespace: 'unReadMsg',
  state: {
    dictListData: {},
    dictDetailData: {},
    fieldListData: {},
    tableRef: {},
    fieldTableRef: {},
  },
  effects: {
    *exportLog({ _ }, { call }) {
      const response = yield call(exportLog);
      if (!response.error) {
        yield downloadXlsFile(response, `案件管理列表${moment().format('MM-DD HH:mm:ss')}`);
      }
    },
    *getList({ payload, resolve }, { call }) {
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
      }
    },
    *getUnReadNum({ payload, resolve }, { call }) {
      const response = yield call(getUnReadNum, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *getNewNum({ payload, resolve }, { call }) {
      const response = yield call(getNewNum, payload);
      if (!response.error) {
        resolve && resolve(response);
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
    fieldTableReload(state) {
      const tableRef = state.fieldTableRef || {};
      setTimeout(() => {
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
