/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { history } from 'umi';
import { extend } from 'umi-request';
import { notification } from 'antd';
import { TOKEN_KEY, getCookie, removeCookie } from './cookie';
import { clearAuthority } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 10000	成功
// 20001	用户未登录
// 20002	账号不存在或密码错误
// 20003	账号已被禁用
// 20004	用户不存在
// 20005	用户已存在
// 30001	无访问权限

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response, data = {} } = error;
  const { msg } = data;

  if (response && response.status) {
    const errorText = msg || codeMessage[response.status];
    if (response.status === 403 || data.code === 20001 || data.code === 20003) {
      // token过期
      removeCookie(TOKEN_KEY);
      clearAuthority();

      requestConfig.extendOptions({
        headers: {
          token: '',
        },
      });

      notification.error({
        key: `${response.status}-${data.code}`,
        message: `请重新登录`, // ${status}: ${url}
        description: '您的账号已过期或在其他设备登录',
      });

      history.replace({
        pathname: '/white/login',
      });

      return { data, error: true };
    }

    notification.error({
      key: `${response.status}-${data.code}`,
      message: `请求错误`, // ${status}: ${url}
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return { data, error: true };
};

export const BASE_URL = process.env.USE_MOCK ? '' : '/shdf';

/**
 * 配置request请求时的默认参数
 */
export const requestConfig = extend({
  // ’prefix‘ 前缀，统一设置 url 前缀
  // prefix: process.env.USE_MOCK ? '' : `${BASE_URL}`,
  prefix: '/shdf',
  headers: {
    token: getCookie(TOKEN_KEY) || '',
    appMark: 'PC',
  },
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

const request = (url: string, config: any) =>
  requestConfig(url, config).then((res: any) => {
    if (res.code === 10000) {
      return res.data || {};
    }
    return res;
  });

export const noErrorRequest = (url: string, config: any) =>
  requestConfig(url, {
    errorHandler: null,
    ...config,
  }).then((res: any) => {
    if (res.code === 10000) {
      return res.data || {};
    }
    return res;
  });

requestConfig.interceptors.response.use(async (response, options) => {
  // noErrorRequest跳过拦截器逻辑
  if (!options.errorHandler) {
    return response;
  }

  // 非2XX请求，默认进入异常处理流程
  if (!response.ok) {
    return response;
  }

  const data = await response.clone().json();

  // 业务异常，抛出请求体，进入异常处理程序
  if (data.code !== 10000) {
    const error = {
      response,
      data,
    };
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  return response;
});

export default request;
