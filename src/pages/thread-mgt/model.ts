import { message } from 'antd';
import { formatPageData } from '@/utils';
import { getAllClues } from './service';

const Model = {
  namespace: 'emClueManagement',
  state: {
    clueListData: {},
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
    *addClues({ payload, resolve }, { call, put }) {
      const response = yield call(addClues, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
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
  },
};
export default Model;
