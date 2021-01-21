import { getCookie, setCookie, AUTHORITY_KEYS } from './cookie';
import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? getCookie(AUTHORITY_KEYS) : str;
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
  setCookie(AUTHORITY_KEYS, JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}
