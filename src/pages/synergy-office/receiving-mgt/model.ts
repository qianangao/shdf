import { message } from 'antd';
import {
  getReceivingList,
  getReceivingReadList,
  getReceivingDetail,
  deleteReceiving,
  distribute,
  getMemberList,
  addReceiving,
  updateReceiving,
  getReceivingCode,
} from './service';

const Model = {
  namespace: 'receivingMgt',
  state: {
    receivingListData: {},
    receivingReadListData: {},
    memberListData: {},
    receivingDetailData: {},
    trendsDetailData: {},
    tableRef: {},
    selectedOrgId: undefined, // 选择的组织id
    DetailModalVisible: false, // 关工组织详情modal visible
    modifyModalVisible: false, // 关工组织编辑modal visible
    addModalVisible: false, // 新增关工组织modal visible
    readModalVisible: false, // 新增关工组织modal visible
    trendsAddModalVisible: false, // 发布动态modal visible
    memberModifyModalVisible: false, // 编辑成员modal visible
    memberAddModalVisible: false, // 新增成员modal visible
  },
  effects: {
    *getReceivingList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getReceivingList, params);

      if (!response.error) {
        const { records, current, total } = response;

        const result = {
          data: records,
          page: current,
          pageSize: payload.pageSize,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            receivingListData: result,
          },
        });
      }
    },
    *getReceivingReadList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };

      const response = yield call(getReceivingReadList, params);

      if (!response.error) {
        const { records, current, totalNum } = response;

        const result = {
          data: records,
          page: current,
          pageSize: payload.pageSize,
          success: true,
          total: totalNum,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            receivingReadListData: result,
          },
        });
      }
    },
    *getMemberList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        currentPage: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getMemberList, params);
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
            memberListData: result,
          },
        });
      }
    },
    *getDetail({ payload, resolve }, { call, put }) {
      // console.log(payload,'payload---3')
      const response = yield call(getReceivingDetail, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            receivingDetailData: response,
          },
        });
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateReceiving, payload);
      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            modifyModalVisible: false,
          },
        });
        message.success('收文登记修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteReceiving({ payload }, { call, put }) {
      const response = yield call(deleteReceiving, payload);

      if (!response.error) {
        message.success('删除成功！');
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
    *distribute({ payload }, { call, put }) {
      const response = yield call(distribute, payload);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            readModalVisible: false,
          },
        });
        message.success('分发成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *add({ payload }, { call, put }) {
      // 先获取编码
      const resCode = yield call(getReceivingCode, {});
      payload.receiptCode = `SW${resCode}`;
      // console.log(payload,'resCode---5')
      const response = yield call(addReceiving, payload);
      if (!response.error) {
        message.success('新增收文登记成功！');
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
        tableRef.current && tableRef.current.reloadAndRest();
      }, 0);
      return { ...state };
    },
  },
};
export default Model;
