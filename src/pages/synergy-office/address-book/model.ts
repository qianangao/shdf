import { message } from 'antd';
import { downloadXlsFile } from '@/utils';
import moment from 'moment';
import {
  getAddressBook,
  deleteAddressBook,
  addAddressBook,
  updateAddressBook,
  templateDownload,
  exportAddressBook,
  getAddressBookDetail
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
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      delete params.current;
      const response = yield call(getAddressBook, params);
      if (!response.error) {
        // const { items, currentPage, totalNum } = response;

        const result = {
          data: response.records,
          page: response.pages,
          pageSize: payload.pageSize,
          success: true,
          total: response.total,
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

    *exportAddressBook({ payload }, { call }) {
      const response = yield call(exportAddressBook, payload); 
      // if (!response.error) {
        yield downloadXlsFile(response, `通讯录列表${moment().format('MM-DD HH:mm:ss')}.xls`);
      // }
    // else {
    //   const fileName = `人员列表${moment().format('MM-DD HH:mm:ss')}.xls`;
    //   params.name = fileName;
    //   const response = yield call(exportLgbsAsync, params);

    //   message.info('文件导出中，请在用户信息栏通知中查看');

    //   if (!response.error) {
    //     yield put({
    //       type: 'global/refreshDownloadFiles',
    //     });
    //   }
    // }
    },
    *getAddressBookDetail({ payload, resolve }, { call }) {
      const response = yield call(getAddressBookDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
      }
    },

    *addAddressBook({ payload, resolve }, { call, put }) {
      const response = yield call(addAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateAddressBook({ payload, resolve }, { call, put }) {
      const response = yield call(updateAddressBook, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *deleteAddressBook({ payload, resolve }, { call, put }) {
      const bookIds = payload.toString()
      const response = yield call(deleteAddressBook, bookIds);
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
