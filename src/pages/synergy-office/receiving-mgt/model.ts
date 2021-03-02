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
    *getFileList({ payload, resolve }, { call }) {
      if (payload.id === '') {
        resolve && resolve({});
        return;
      }
      const response = yield call(getReceivingDetail, payload);

      if (!response.error) {
        const { fileList, current } = response;

        const result = {
          data: fileList,
          page: current,
          pageSize: fileList.length,
          success: true,
          total: fileList.length,
        };
        resolve && resolve(result);
      } else {
        resolve && resolve({});
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
      const response = yield call(getReceivingDetail, payload);

      if (!response.error) {
        const fileList =
          response.fileList &&
          response.fileList.map(item => {
            return {
              url: item.url,
              uid: item.fileId,
              name: item.fileName,
              status: 'done',
            };
          });
        response.fileList = fileList;
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            receivingDetailData: response,
          },
        });
      }
    },
    *update({ payload, resolve }, { call, put }) {
      const response = yield call(updateReceiving, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('收文登记修改成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *deleteReceiving({ payload, resolve }, { call, put }) {
      const response = yield call(deleteReceiving, payload);
      if (!response.error) {
        resolve && resolve(response);
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
    *distribute({ payload, resolve }, { call, put }) {
      const response = yield call(distribute, payload);

      if (!response.error) {
        resolve && resolve(response);
        message.success('分发成功！');
        yield put({
          type: 'tableReload',
        });
      }
    },
    *add({ payload, resolve }, { call, put }) {
      // 先获取编码
      const resCode = yield call(getReceivingCode, {});
      payload.receiptCode = `SW${resCode}`;
      const response = yield call(addReceiving, payload);
      if (!response.error) {
        resolve && resolve(response);
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
