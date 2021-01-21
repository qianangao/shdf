import { message } from 'antd';
import { addRole, updateRole, deleteRoles, getRoleList } from './service';

const Model = {
  namespace: 'smRoleMgt',
  state: {
    roleListData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getRoleList({ payload, resolve }, { call, put, select }) {
      const orgIdForDataSelect = yield select(state => state.smRoleMgt.selectedOrgId);

      const params = {
        ...payload,
        allIndex: 'ONLY',
        orgIdForDataSelect,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getRoleList, params);

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
            roleListData: result,
          },
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
    *addRole({ payload, resolve }, { call, put }) {
      const response = yield call(addRole, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('角色新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateRole({ payload, resolve }, { call, put }) {
      const response = yield call(updateRole, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('修改角色信息成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteRoles({ payload }, { call, put }) {
      const response = yield call(deleteRoles, payload);

      if (!response.error) {
        message.success('角色删除成功！');
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
        tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
