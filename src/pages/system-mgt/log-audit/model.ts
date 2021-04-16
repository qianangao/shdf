import { downloadXlsFile } from '@/utils';
import moment from 'moment';
import { exportLog, getList } from './service';

const Model = {
  namespace: 'logAudit',
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
        yield downloadXlsFile(response, `日志列表${moment().format('MM-DD HH:mm:ss')}`);
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
