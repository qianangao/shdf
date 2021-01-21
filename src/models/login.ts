import { history } from 'umi';
import { stringify } from 'querystring';
import { accountLogin, getCaptcha, accountLogout } from '@/services/login';
import { requestConfig } from '@/utils/request';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { TOKEN_KEY, setCookie, getCookie, removeCookie } from '@/utils/cookie';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    token: getCookie(TOKEN_KEY) || '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      if (response.error) {
        yield put({
          type: 'save',
          payload: {
            status: 'error',
          },
        });
        return;
      }

      if (response.token) {
        // 储存用户token
        setCookie(TOKEN_KEY, response.token);
        setAuthority(response.authorityList);

        requestConfig.extendOptions({
          headers: {
            token: response.token,
          },
        });

        yield put({
          type: 'save',
          payload: {
            token: response.token,
            status: undefined,
          },
        });

        // 存储用户信息
        yield put({
          type: 'user/saveUserInfo',
          payload: response.userInfo,
        });

        // 判断是否有已打开页面
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        // TODO 暂不需要重新登陆的页面重定向，暂时屏蔽相关逻辑
        // eslint-disable-next-line no-constant-condition
        if (redirect && false) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }

            const routerbase = window.routerBase;

            if (routerbase.length > 0 && redirect.match(`^${routerbase}`)) {
              redirect = redirect.substr(routerbase.length - 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield history.replace(/* redirect || */ '/');
      }
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getCaptcha, payload);
    },
    *logout({ payload }, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      yield call(accountLogout, payload);

      removeCookie(TOKEN_KEY);

      requestConfig.extendOptions({
        headers: {
          token: '',
        },
      });

      if (window.location.pathname !== '/white/login' && !redirect) {
        yield history.replace({
          pathname: '/white/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      } else {
        yield history.replace({
          pathname: '/white/login',
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
