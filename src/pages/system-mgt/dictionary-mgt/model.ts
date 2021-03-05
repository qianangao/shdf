import { message } from 'antd';
import {
  addDict,
  deleteDicts,
  getDictList,
  addType,
  updateDict,
  updateType,
  deleteTypes,
  getFieldList,
} from './service';

const Model = {
  namespace: 'smDictionaryMgt',
  state: {
    dictListData: {},
    dictDetailData: {},
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
          type: 'fieldTableReload',
        });
      }
    },
    *updateDict({ payload, resolve }, { call, put }) {
      const response = yield call(updateDict, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息修改成功！');

        yield put({
          type: 'fieldTableReload',
        });
      }
    },
    *deleteDicts({ payload, resolve }, { call, put }) {
      const response = yield call(deleteDicts, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字典信息删除成功！');

        yield put({
          type: 'fieldTableReload',
        });
      }
    },
    *getDictList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getDictList, params);

      if (!response.error) {
        const { dictInfoList, currentPage, total } = response;

        const result = {
          data: dictInfoList,
          page: currentPage,
          pageSize: payload.pageSize,
          success: true,
          total,
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
    *addType({ payload, resolve }, { call, put }) {
      const response = yield call(addType, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateType({ payload, resolve }, { call, put }) {
      const response = yield call(updateType, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteTypes({ payload, resolve }, { call, put }) {
      const response = yield call(deleteTypes, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('字段信息删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *getFieldList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getFieldList, params);

      if (!response.error) {
        const { dictInfoList, currentPage, total } = response;

        const result = {
          data: dictInfoList,
          page: currentPage,
          pageSize: payload.pageSize,
          success: true,
          total,
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
