// import { LocalCache } from '@/utils/storage';
import { message } from 'antd';
import { getOrgList, deleteOrgList, addOrgList, updateOrgList, getOrgListDetail } from './service';

const Model = {
  namespace: 'guanli',
  state: {
    tableRef: {},
    addressListData: {},
    OrgListDetailData: {},
  },
  effects: {
    *getOrgList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getOrgList, params);
      if (!response.error) {
        // const result = formatPageData(response);
        const result = {
          data: response,
          page: 1,
          pageSize: payload.pageSize,
          success: true,
          total: response.length,
        };

        resolve && resolve(result);
        yield put({
          type: 'save',
          payload: {
            addressListData: result,
          },
        });
      }
    },

    *getOrgListDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getOrgListDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            OrgListDetailData: response,
          },
        });
      }
    },

    *addOrgList({ payload, resolve }, { call, put }) {
      const response = yield call(addOrgList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateOrgList({ payload, resolve }, { call, put }) {
      const response = yield call(updateOrgList, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *deleteOrgList({ payload, resolve }, { call, put }) {
      const orgId = payload.toString();
      const response = yield call(deleteOrgList, orgId);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');

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
    removePersonDetail(state) {
      return { ...state, personDetailData: {} };
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
