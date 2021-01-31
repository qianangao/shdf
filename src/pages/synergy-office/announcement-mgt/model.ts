import { message } from 'antd';
import {
  getAnnouncementList,
  getAnnouncementDetail,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  publishAnnouncement,
  getReadInfo,
  replyAnnouncement,
  getReceiveList,
  rollbackOrCloseAnnouncement,
  commitExamineAnnouncement,
} from './service';

const Model = {
  namespace: 'soAnnouncementMgt',
  state: {
    announcementListData: {},
    receiveListData: {},
    announcementData: {},
    readSituationData: {},
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
        const { records, page, total } = response;
        const result = {
          data: records,
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
    *getReceiveList({ payload, resolve }, { call, put }) {
      const params = {
        ...payload,
        pageNum: payload.current,
        pageSize: payload.pageSize,
      };
      const response = yield call(getReceiveList, params);

      if (!response.error) {
        const { records, page, total } = response;
        const result = {
          data: records,
          page,
          pageSize: payload.pageSize,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            receiveListData: result,
          },
        });
      }
    },
    *getReadInfo({ payload, resolve }, { call, put }) {
      const response = yield call(getReadInfo, payload);

      if (!response.error) {
        const { records, page, total } = response;
        const result = {
          data: records,
          page,
          pageSize: payload.pageSize,
          success: true,
          total,
        };

        resolve && resolve(result);

        yield put({
          type: 'save',
          payload: {
            readSituationData: result,
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
        message.success('公告新增成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *commitExamineAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(commitExamineAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('提交审核成功！');

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
    *deleteAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(deleteAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('公告信息删除成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *publishAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(publishAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('公告信息发布成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *rollbackOrCloseAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(rollbackOrCloseAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        if (payload.handleType === 1) message.success('公告信息关闭成功！');
        else message.success('公告信息撤回成功！');

        yield put({
          type: 'tableReload',
        });
      }
    },
    *replyAnnouncement({ payload, resolve }, { call, put }) {
      const response = yield call(replyAnnouncement, payload);
      if (!response.error) {
        resolve && resolve(response);
        message.success('回复公告信息成功！');

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
