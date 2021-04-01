import { message } from 'antd';
import { downloadExcelFile } from '@/utils';
import moment from 'moment';
import { formatPageData } from '@/utils/index';
import {
  getUserList,
  deleteUser,
  addUser,
  updateUser,
  templateDownload,
  exportAddressBook,
  importAddressBook,
  getUserDetail,
  addRole,
  getAddroleList,
  getRoleList,
  useraddRole,
} from './service';

const Model = {
  namespace: 'userMgt',
  state: {
    tableRef: {},
    addressListData: {},
    usetListData: {},
    getAddroleData: {},
    getRoleData: {},
  },
  effects: {
    *getUserList({ payload, resolve }, { call }) {
      const params = {
        ...payload,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getUserList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
        // yield put({
        //   type: 'save',
        //   payload: {
        //     usetListData: result,
        //   },
        // });
      }
    },
    *getAddroleList({ payload, resolve }, { call, put }) {
      const response = yield call(getAddroleList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            getAddroleData: response,
          },
        });
      }
    },
    *getRoleList({ payload, resolve }, { call, put }) {
      const response = yield call(getRoleList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            getRoleData: response,
          },
        });
      }
    },
    *useraddRole({ payload, resolve }, { call, put }) {
      const response = yield call(useraddRole, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('角色添加成功');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *addRole({ payload, resolve }, { call, put }) {
      const response = yield call(addRole, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getUserDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getUserDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            usetListData: response,
          },
        });
      }
    },

    *addUser({ payload, resolve }, { call, put }) {
      const response = yield call(addUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('新增成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateUser({ payload, resolve }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },

    *deleteUser({ payload, resolve }, { call, put }) {
      const bookIds = payload.toString();
      const response = yield call(deleteUser, bookIds);
      if (!response.error) {
        resolve && resolve(response);
        message.success('删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *templateDownload({ _ }, { call }) {
      const response = yield call(templateDownload);
      if (!response.error) {
        yield downloadExcelFile(response, `通讯录模板`);
      }
    },

    *exportAddressBook({ payload }, { call }) {
      const response = yield call(exportAddressBook, payload);
      if (!response.error) {
        yield downloadExcelFile(response, `通讯录列表${moment().format('MM-DD HH:mm:ss')}`);
      }
    },

    *importAddressBook({ payload, resolve }, { call, put }) {
      const formData = new FormData();
      formData.append('file', payload.file);
      const response = yield call(importAddressBook, formData);
      if (!response.error) {
        resolve && resolve(response);
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
