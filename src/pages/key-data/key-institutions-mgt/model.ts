import { message } from 'antd';
import { downloadXlsFile, formatPageData } from '@/utils';
import moment from 'moment';
import {
  addKeyInstitutions,
  authUser,
  deleteKeyInstitutions,
  exportInstitutions,
  getKeyInstitutions,
  getKeyInstitutionsDetail,
  importInstitutions,
  templateDownload,
  updateKeyInstitutions,
} from './service';
import { formatDateStr } from '@/utils/format';

const Model = {
  namespace: 'kdKeyInstitutionsMgt',
  state: {
    institutionsListData: {},
    institutionData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getKeyInstitutions({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
        establishDate: formatDateStr(payload.establishDate, 'YYYY-MM-DD'),
      };
      const response = yield call(getKeyInstitutions, params);

      if (!response.error) {
        const result = formatPageData(response);

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            institutionsListData: result,
          },
        });
      }
    },
    *getKeyInstitutionsDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getKeyInstitutionsDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            institutionData: response,
          },
        });
      }
    },
    *addKeyInstitutions({ payload, resolve }, { call, put }) {
      const response = yield call(addKeyInstitutions, payload);
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
    *updateKeyInstitutions({ payload, resolve }, { call, put }) {
      const response = yield call(updateKeyInstitutions, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('重点机构信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteKeyInstitutions({ payload, resolve }, { call, put }) {
      const response = yield call(deleteKeyInstitutions, payload);
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
        yield downloadXlsFile(response, `重点机构模板`);
      }
    },
    *exportInstitutions({ payload }, { call }) {
      const response = yield call(exportInstitutions, payload);
      if (!response.error) {
        yield downloadXlsFile(response, `重点机构${moment().format('YYYYMMDDHHmmss')}`);
      }
    },

    *importInstitutions({ payload, resolve }, { call, put }) {
      const formData = new FormData();
      formData.append('file', payload.file);
      const response = yield call(importInstitutions, formData);
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
    removeInstitution(state) {
      return { ...state, institutionData: {} };
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
