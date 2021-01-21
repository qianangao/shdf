import Cookies from 'js-cookie';

export const TOKEN_KEY = 'RETURN_WORK_TOKEN'; // token存储的键
export const USER_INFO = 'USER_INFO'; // 用户信息存储的键
export const AUTHORITY_KEYS = 'AUTHORITY_KEYS'; // 用户权限存储的键

export const getCookie = key => Cookies.get(key); // => 'value'

export const setCookie = (key, value) => {
  Cookies.set(key, value); // => 'value'
};

export const removeCookie = key => {
  Cookies.remove(key);
};
