import { message } from 'antd';
import {
  addDict,
  deleteDicts,
  getDictList,
  addField,
  updateField,
  deleteFields,
  getFieldList,
} from './service';

const Model = {
  namespace: 'smDictionaryMgt',
  state: {
    dictListData: {},
    fieldListData: {},
    tableRef: {},
    fieldTableRef: {},
  },
  effects: {
    *addDict({ payload, resolve }, { call, put }) {
      const response = yield call(addDict, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字典信息新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteDicts({ payload, resolve }, { call, put }) {
      const response = yield call(deleteDicts, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字典信息删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *getDictList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getDictList, params);

      if (!response.error) {
        const { items, currentPage, totalNum } = response;

        const result = {
          data: items,
          page: currentPage,
          pageSize: payload.pageSize,
          success: true,
          total: totalNum,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            dictListData: result,
          },
        });
      }
    },

    *addField({ payload, resolve }, { call, put }) {
      const response = yield call(addField, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息新增成功！');

        yield put({
          type: 'fieldTableReload',
        });
      }
    },

    *updateField({ payload, resolve }, { call, put }) {
      const response = yield call(updateField, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息修改成功！');

        yield put({
          type: 'fieldTableReload',
        });
      }
    },
    *deleteFields({ payload, resolve }, { call, put }) {
      const response = yield call(deleteFields, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息删除成功！');

        yield put({
          type: 'fieldTableReload',
        });
      }
    },
    *getFieldList({ payload, resolve }, { call, put }) {
      const response = yield call(getFieldList, payload);

      if (!response.error) {
        const result = {
          data: response,
          success: true,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            fieldListData: result,
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
