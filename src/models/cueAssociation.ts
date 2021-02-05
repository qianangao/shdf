import { getCueAssociationById } from '@/services/cueAssociation';
import { formatPageData } from '@/utils';

const Model = {
  namespace: 'cueAssociation',
  state: {
    cueAssociationList: {},
  },
  effects: {
    *getAssociationList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getCueAssociationById, params);

      if (!response.error) {
        const result = formatPageData(response);

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            cueAssociationList: result,
          },
        });
      }
    },
    *getAssociationDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getCueAssociationById, payload);
      if (!response.error) {
        resolve && resolve(response);

        yield put({
          type: 'save',
          payload: {
            cueAssociationList: response,
          },
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
