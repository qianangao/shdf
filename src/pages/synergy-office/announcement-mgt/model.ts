import { message } from 'antd';
import {
  getAnnouncementList,
  getAnnouncementDetail,
  addAnnouncement,
  updateAnnouncement,
} from './service';

const Model = {
  namespace: 'soAnnouncementMgt',
  state: {
    announcementListData: {},
    announcementData: {},
    tableRef: {},
    fieldTableRef: {},
  },
  effects: {
    *getAnnouncementList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getAnnouncementList, params);

      if (!response.error) {
        const { data, page, total } = response;
        const result = {
          data: data.records,
          page,
          pageSize: payload.pageSize,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            announcementListData: result,
          },
        });
      }
    },
    *getAnnouncementDetail({ payload, resolve }, { call, put }) {
      const response = yield call(getAnnouncementDetail, payload);
      if (!response.error) {
        resolve && resolve(response);

        yield put({
          type: 'save',
          payload: {
            announcementData: response,
          },
        });
      }
    },

    *addAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(addAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        // message.success('公告新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },

    *updateAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(updateAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('公告信息修改成功！');

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
