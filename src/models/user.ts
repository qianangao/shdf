import { getCookie, setCookie, USER_INFO } from '@/utils/cookie';
import { resetPassword } from '@/services/user';
import { notification } from 'antd';

const Model = {
  namespace: 'user',
  state: {
    userInfo: getCookie(USER_INFO) ? JSON.parse(getCookie(USER_INFO)) : {},
    reserPasswordResponse: {},
  },
  effects: {
    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
      yield put({
        type: 'save',
        payload: {
          reserPasswordResponse: response || {},
        },
      });

      if (!response || !response.error) {
        notification.success({
          description: '已返回登陆页，请重新登录',
          message: '密码重置成功！',
        });

        yield put({
          type: 'login/logout',
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveUserInfo(state, { payload }) {
      setCookie(USER_INFO, payload);
      return { ...state, userInfo: payload };
    },
    clearResetPasswordResponse(state) {
      return { ...state, reserPasswordResponse: {} };
    },
  },
};
export default Model;
