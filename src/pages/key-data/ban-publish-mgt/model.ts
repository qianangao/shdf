import { message } from 'antd';
import { formatPageData } from '@/utils';
import {
  getKeyBanPublishList,
  getBanPublishDetail,
  addBanPublish,
  updateBanPublish,
  deleteBanPublish,
  authUser,
} from './service';

const Model = {
  namespace: 'kdBanPublishMgt',
  state: {
    banPublishListData: {},
    banPublishDetail: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
  },
  effects: {
    *getKeyBanPublishList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getKeyBanPublishList, params);

      if (!response.error) {
        const result = formatPageData(response);

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            banPublishListData: result,
          },
        });
      }
    },
    *getBanPublishDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getBanPublishDetail, payload);
      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            banPublishDetail: response,
          },
        });
      }
    },

    *addBanPublish({ payload, resolve }, { call, put }) {
      const response = yield call(addBanPublish, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('非法出版物新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateBanPublish({ payload, resolve }, { call, put }) {
      const response = yield call(updateBanPublish, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('非法出版物信息修改成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteBanPublish({ payload, resolve }, { call, put }) {
      const response = yield call(deleteBanPublish, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('非法出版物删除成功！');

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
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    removeBanPublish(state) {
      return { ...state, banPublishDetail: {} };
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
