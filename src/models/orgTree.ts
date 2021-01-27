import { message } from 'antd';

import {
  getOrgTreeById,
  searchOrgTree,
  getAllOrgTree,
  addOrg,
  updateOrg,
  deleteOrgs,
  getOrgList,
  getOrgItem,
} from '@/services/orgTree';

const transformOrgTreeData = tree => {
  const parentIds = [];
  tree.map(node => {
    if (node.children) {
      parentIds.push(node.id);
      parentIds.push(...transformOrgTreeData(node.children));
    }
    node.key = node.id || node.key;
    node.title = node.organizationName || node.title;
    node.isSubunit !== undefined && (node.isLeaf = !node.isSubunit);
    return node;
  });

  return parentIds;
};

const updateTreeData = (list, key, children) => {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
};

const model = {
  namespace: 'orgTree',
  state: {
    orgTreeData: [],
    multiOrgTreeData: [],
    selectedOrgId: undefined, // 选择的组织id
    orgList: [],
    detailOrgData: {},
    tableRef: {},
  },
  effects: {
    *getOrgTreeById({ payload = {}, orgSymbol, resolve }, { call, put, select }) {
      const { organizationId, organizationName } = yield select(state => state.user.userInfo);
      const orgTreeData = yield select(state => state.orgTree[orgSymbol].orgTreeData);
      const orgLoadedLoadedKeys = yield select(
        state => state.orgTree[orgSymbol].orgLoadedLoadedKeys,
      );
      const id = payload.id || organizationId; // 默认使用user的orgid

      const response = yield call(getOrgTreeById, { id });

      if (!response.error) {
        if (orgTreeData.length === 0) {
          orgTreeData.push({
            key: organizationId,
            title: organizationName,
          });
        }

        transformOrgTreeData(response);

        const treeData = updateTreeData(orgTreeData, id, response);

        resolve && resolve();

        yield put({
          type: 'saveOrgTree',
          payload: {
            orgTreeData: treeData,
            orgLoadedLoadedKeys: [...orgLoadedLoadedKeys, id],
          },
          orgSymbol,
        });

        if (id === organizationId) {
          yield put({
            type: 'saveOrgTree',
            payload: {
              orgSelectedKeys: [organizationId],
              orgExpandedKeys: [organizationId],
            },
            orgSymbol,
          });
        }
      }
    },
    *searchOrgTree({ payload, orgSymbol }, { call, put, select }) {
      const { organizationId } = yield select(state => state.user.userInfo);

      const response = yield call(searchOrgTree, {
        orgIdForDataSelect: organizationId,
        ...payload,
      });

      if (!response.error) {
        const parentIds = transformOrgTreeData(response);

        yield put({
          type: 'saveOrgTree',
          payload: {
            searchOrgTreeData: response,
            orgExpandedKeys: parentIds,
          },
          orgSymbol,
        });
      }
    },
    *getAllOrgTree(_, { call, put, select }) {
      const multiData = yield select(state => state.orgTree.multiOrgTreeData);
      if (multiData.length > 0) return;

      const { organizationId } = yield select(state => state.user.userInfo);
      const response = yield call(getAllOrgTree, {
        id: organizationId,
      });

      if (!response.error) {
        transformOrgTreeData(response);

        yield put({
          type: 'save',
          payload: {
            multiOrgTreeData: response,
          },
        });
      }
    },
    *clearSearchData({ orgSymbol }, { put, select }) {
      const { organizationId } = yield select(state => state.user.userInfo);
      yield put({
        type: 'saveOrgTree',
        payload: {
          searchOrgTreeData: null,
          orgExpandedKeys: [organizationId],
        },
        orgSymbol,
      });
    },
    *getOrgList({ payload, resolve }, { call, put, select }) {
      const selectedOrgId = yield select(state => state.orgTree.selectedOrgId);
      const { organizationId } = yield select(state => state.user.userInfo);

      const params = {
        ...payload,
        orgIdForDataSelect: selectedOrgId || organizationId,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getOrgList, params);

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
            orgList: result,
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
    *addOrg({ payload, resolve }, { call, put }) {
      const response = yield call(addOrg, payload);
      if (!response.error) {
        message.success('组织新增成功！');

        resolve();

        yield put({
          type: 'tableReload',
        });
      }
    },
    *updateOrg({ payload, resolve }, { call, put }) {
      const response = yield call(updateOrg, payload);
      if (!response.error) {
        message.success('组织信息修改成功！');

        resolve();
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteOrgs({ payload }, { call, put }) {
      const response = yield call(deleteOrgs, payload);

      if (!response.error) {
        message.success('组织删除成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *getOrgItem({ payload, resolve }, { call, put }) {
      const response = yield call(getOrgItem, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailOrgData: response,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOrgTree(state, { payload, orgSymbol }) {
      const symbolData = { ...state[orgSymbol], ...payload };

      return { ...state, [orgSymbol]: symbolData };
    },
    initTreeData(state, { payload, orgSymbol }) {
      const { value } = payload;
      return {
        ...state,
        [orgSymbol]: {
          orgTreeData: [],
          searchOrgTreeData: null,
          orgLoadedLoadedKeys: [],
          orgSelectedKeys: value ? [value] : [],
          orgExpandedKeys: [],
        },
      };
    },
    destroyTree(state, { orgSymbol }) {
      const stateTemp = state;
      delete stateTemp[orgSymbol];

      return {
        ...stateTemp,
      };
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
export default model;
