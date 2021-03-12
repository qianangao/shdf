import { message } from 'antd';
import { formatPageData } from '@/utils/index';
import {
  addRole,
  updateRole,
  deleteRoles,
  getRoleList,
  getRoleTree,
  // importUserInfo,
  // templateDownload,
  getAuthTree,
  updateRoleRules,
  getRoleDetail,
  getRoleRules,
  // getUserDetail,
  // getUserList,
  // addUser,
  // updateUser,
  // distributeUser
} from './service';

const Model = {
  namespace: 'smRoleMgt',
  state: {
    loading: false,
    roleTree: [],
    ruleData: [],
    orgId: '',
    tableRef: {},
  },
  effects: {
    *getRoleTree({ payload, resolve }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const response = yield call(getRoleTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            roleTree: response,
            loading: false,
            orgId: response[0].key,
          },
        });
        yield put({
          type: 'tableReload',
        });
      }
    },

    *getListTable({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          orgId: payload.orgId,
        },
      });
      yield put({
        type: 'tableReload',
      });
    },

    *getAuthTree({ payload, resolve }, { call, put }) {
      const response = yield call(getAuthTree, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            ruleData: response.records,
          },
        });
      }
    },
    *updateRoleRules({ payload, resolve }, { call }) {
      const response = yield call(updateRoleRules, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
      }
    },
    *getRoleRules({ payload, resolve }, { call }) {
      const response = yield call(getRoleRules, payload);
      if (!response.error) {
        resolve && resolve(response);
      }
    },
    // *distributeUser({ payload, resolve }, { call }) {
    //   const response = yield call(distributeUser, payload);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //   }
    // },

    // *templateDownload({ _ }, { call }) {
    //   const response = yield call(templateDownload);
    //   if (!response.error) {
    //     yield downloadExcelFile(response, `工作人员信息模板`);
    //   }
    // },

    // *importUserInfo({ payload, resolve }, { call, put }) {
    //   const formData = new FormData();
    //   formData.append('file', payload.file);
    //   const response = yield call(importUserInfo, formData);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //     // yield put({
    //     //   type: 'tableReload',
    //     // });
    //   }
    // },
    *getRoleList({ payload, resolve }, { call, select }) {
      const orgId = yield select(state => state.smRoleMgt.orgId);
      const params = {
        ...payload,
        orgId,
        pageNum: payload.current ? payload.current : 1,
        pageSize: payload.pageSize ? payload.pageSize : 20,
      };
      delete params.current;
      const response = yield call(getRoleList, params);
      if (!response.error) {
        const result = formatPageData(response);
        resolve && resolve(result);
      }
    },
    *getRoleDetail({ payload, resolve }, { call }) {
      const response = yield call(getRoleDetail, payload);
      if (!response.error) {
        response.publicRole += '';
        resolve && resolve(response);
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
    *updateRole({ payload, resolve }, { call, put }) {
      const response = yield call(updateRole, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteRoles({ payload }, { call, put }) {
      const response = yield call(deleteRoles, payload);
      if (!response.error) {
        message.success('删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    // *getUserList({ payload, resolve }, { call, put, select }) {
    //   const orgId = yield select(state => state.smRoleMgt.orgId);
    //   const params = {
    //     ...payload,
    //     orgId,
    //     pageNum: payload.current ? payload.current : 1,
    //     pageSize: payload.pageSize ? payload.pageSize : 20,
    //   };
    //   delete params.current;
    //   const response = yield call(getUserList, params);
    //   if (!response.error) {
    //     const result = formatPageData(response);
    //     resolve && resolve(result);
    //     // yield put({
    //     //   type: 'save',
    //     //   payload: {
    //     //     userListData: result,
    //     //   },
    //     // });
    //   }
    // },
    // *addUser({ payload, resolve }, { call, put }) {
    //   const response = yield call(addUser, payload);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //     message.success('新增成功！');
    //     yield put({
    //       type: 'userTableReload',
    //     });
    //   }
    // },
    // *updateUser({ payload, resolve }, { call, put }) {
    //   const response = yield call(updateUser, payload);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //     message.success('修改成功！');
    //     yield put({
    //       type: 'userTableReload',
    //     });
    //   }
    // },
    // *getUserDetail({ payload, resolve }, { call }) {
    //   const response = yield call(getUserDetail, payload);
    //   if (!response.error) {
    //     resolve && resolve(response);
    //   }
    // },

    // *selectOrgChange({ payload }, { put }) {
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       selectedOrgId: payload,
    //     },
    //   });

    //   yield put({
    //     type: 'tableReload',
    //   });
    // },
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
    // userTableReload(state) {
    //   const userTableRef = state.tableRef || {};
    //   setTimeout(() => {
    //     // tableRef.current.reloadAndRest 刷新并清空，页码也会重置
    //     userTableRef.current && userTableRef.current.reloadAndRest();
    //   }, 0);
    //   return { ...state };
    // },
  },
};
export default Model;
