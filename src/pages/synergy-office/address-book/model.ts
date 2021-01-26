import { message } from 'antd';
import {
  getAddressBook,
  deleteAddressBook,
  addAddressBook,
  updateAddressBook,
  templateDownload,
  exportAddressBook,
} from './service';

const Model = {
  namespace: 'emAddressBook',
  state: {
    tableRef: {},
    addressListData: {},
  },
  effects: {
    *getAddressBook({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getAddressBook, params);

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
            addressListData: result,
          },
        });
      }
    },

    *templateDownload({ resolve }, { call }) {
      const response = yield call(templateDownload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },

    *exportAddressBook({ payload, resolve }, { call }) {
      const response = yield call(exportAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    *addAddressBook({ payload, resolve }, { call, put }) {
      const response = yield call(addAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateAddressBook({ payload, resolve }, { call, put }) {
      const response = yield call(updateAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *deleteAddressBook({ payload, resolve }, { call, put }) {
      const response = yield call(deleteAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构删除成功！');

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
        // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};

export default Model;
