import {
  noticeAnnouncementList,
  elegantDemeanorList,
  pictureList,
  achievementList,
  elderlyPolicyList,
  detailNoticeAnnouncement,
  detailElegantDemeanor,
  detailPicture,
  detailAchievement,
  detailElderlyPolicy,
} from './service';

const Model = {
  namespace: 'home',
  state: {
    noticeAnnouncementData: {},
    elegantDemeanorData: {},
    pictureListData: {},
    achievementListData: {},
    elderlyPolicyListData: {},
    detailNoticeAnnouncementData: {},
    detailElegantDemeanorData: {},
    detailPictureData: {},
    detailAchievementData: {},
    detailElderlyPolicyData: {},
  },
  effects: {
    *noticeAnnouncementList({ payload, resolve }, { call, put }) {
      const response = yield call(noticeAnnouncementList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            noticeAnnouncementData: response,
          },
        });
      }
    },
    *detailNoticeAnnouncement({ payload, resolve }, { call, put }) {
      const payloadNotice = { ...payload, isApp: 0 };
      const response = yield call(detailNoticeAnnouncement, payloadNotice);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailNoticeAnnouncementData: response,
          },
        });
      }
    },
    *elegantDemeanorList({ payload, resolve }, { call, put }) {
      const response = yield call(elegantDemeanorList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            elegantDemeanorData: response,
          },
        });
      }
    },
    *detailElegantDemeanor({ payload, resolve }, { call, put }) {
      const response = yield call(detailElegantDemeanor, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailElegantDemeanorData: response,
          },
        });
      }
    },
    *pictureList({ payload, resolve }, { call, put }) {
      const response = yield call(pictureList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            pictureListData: response,
          },
        });
      }
    },
    *detailPicture({ payload, resolve }, { call, put }) {
      const response = yield call(detailPicture, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailPictureData: response,
          },
        });
      }
    },
    *achievementList({ payload, resolve }, { call, put }) {
      const response = yield call(achievementList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            achievementListData: response,
          },
        });
      }
    },
    *detailAchievement({ payload, resolve }, { call, put }) {
      const response = yield call(detailAchievement, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailAchievementData: response,
          },
        });
      }
    },
    *elderlyPolicyList({ payload, resolve }, { call, put }) {
      const response = yield call(elderlyPolicyList, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            elderlyPolicyListData: response,
          },
        });
      }
    },
    *detailElderlyPolicy({ payload, resolve }, { call, put }) {
      const response = yield call(detailElderlyPolicy, payload);

      if (!response.error) {
        resolve && resolve(response);
        yield put({
          type: 'save',
          payload: {
            detailElderlyPolicyData: response,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
