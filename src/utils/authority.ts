import { LocalCache, AUTHORITY_KEYS } from '@/utils/storage';
import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? LocalCache.get(AUTHORITY_KEYS) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  LocalCache.set(AUTHORITY_KEYS, proAuthority);
  // auto reload
  reloadAuthorized();
}

export function clearAuthority() {
  LocalCache.remove(AUTHORITY_KEYS);
}

/**
 * 验证用户是否拥有对应权限
 * @param val 权限值
 * @returns 是否具有对应权限
 */
export function checkAuthority(val: string) {
  const authorizedList = LocalCache.get(AUTHORITY_KEYS) || [''];
  if (authorizedList && authorizedList.indexOf(val) > -1) {
    return true;
  }
  return false;
}
