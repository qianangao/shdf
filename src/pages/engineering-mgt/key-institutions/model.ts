import { message } from 'antd';
import {
  getKeyInstitons,
  getKeyInstitonDetail,
  addKeyInstiton,
  updateKeyInstiton,
  deleteKeyInstiton,
} from './service';

const Model = {
  namespace: 'emKeyInstitutions',
  state: {
    institonListData: {},
    fieldListData: {},
    tableRef: {},
    fieldTableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getKeyInstitons({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getKeyInstitons, params);

      if (!response.error) {
        // const { items, currentPage, totalNum } = response;

        const result = {
          data: response,
          // page: currentPage,
          // pageSize: payload.pageSize,
          success: true,
          // total: totalNum,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            institonListData: result,
          },
        });
      }
    },
    *getKeyInstitonDetail({ payload, resolve }, { call }) {
      const response = yield call(getKeyInstitonDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },

    *addKeyInstiton({ payload, resolve }, { call, put }) {
      const response = yield call(addKeyInstiton, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateKeyInstiton({ payload, resolve }, { call, put }) {
      const response = yield call(updateKeyInstiton, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteKeyInstiton({ payload, resolve }, { call, put }) {
      const response = yield call(deleteKeyInstiton, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构删除成功！');

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
