import { message } from 'antd';
import { downloadXlsFile, formatPageData } from '@/utils';
import moment from 'moment';
import {
  getKeyPerson,
  getKeyPersonDetail,
  addKeyPerson,
  updateKeyPerson,
  deleteKeyPerson,
  authUser,
  templateDownload,
  importPerson,
  exportPerson,
} from './service';

const Model = {
  namespace: 'kdKeyPersonMgt',
  state: {
    personListData: {},
    personDetailData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getKeyPerson({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getKeyPerson, params);

      if (!response.error) {
        const result = formatPageData(response);

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            personListData: result,
          },
        });
      }
    },
    *getKeyPersonDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getKeyPersonDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            personDetailData: response,
          },
        });
      }
    },
    *addKeyPerson({ payload, resolve }, { call, put }) {
      const response = yield call(addKeyPerson, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *authUser({ payload, resolve }, { call }) {
      const response = yield call(authUser, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('授权成功！');

        // yield put({
        //   type: 'tableReload',
        // });
      }
    },
    *updateKeyPerson({ payload, resolve }, { call, put }) {
      const response = yield call(updateKeyPerson, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteKeyPerson({ payload, resolve }, { call, put }) {
      const response = yield call(deleteKeyPerson, payload);
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
    *templateDownload({ _ }, { call }) {
      const response = yield call(templateDownload);
      if (!response.error) {
        yield downloadXlsFile(response, `重点人物模板`);
      }
    },
    *exportPerson({ payload }, { call }) {
      const response = yield call(exportPerson, payload);
      if (!response.error) {
        yield downloadXlsFile(response, `重点人物${moment().format('YYYYMMDDHHmmss')}`);
      }
    },

    *importPerson({ payload, resolve }, { call, put }) {
      const formData = new FormData();
      formData.append('file', payload.file);
      const response = yield call(importPerson, formData);
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
    removePersonDetail(state) {
      return { ...state, personDetailData: {} };
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
