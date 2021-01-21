/* eslint-disable */

class LocalStorageCache {
  private static instance: LocalStorageCache; // 类型为这个类

  private constructor() {}

  static getInstance() {
    if (!LocalStorageCache.instance) {
      LocalStorageCache.instance = new LocalStorageCache();
    }
    return LocalStorageCache.instance;
  }

  /**
   * 设置值
   *
   * @param key
   * @param value
   */
  set(key: string, value: any): void {
    const serializeObj = {
      value,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(key, JSON.stringify(serializeObj));
  }

  /**
   * 属性变更
   * <br/>
   * 1.拓展属性（例如 timestamp 等）将会自动更新；
   * 2.仅在值为 json 类型时可使用，
   * 例如：
   * {
   *   key : info,
   *   value : {
   *     name : string,
   *     age : integer
   *   }
   * }，
   * 属性动态添加或修改可使用：
   * apply(key, attr, value)
   *
   * @param key
   * @param attr
   * @param value
   */
  apply(key: string, attr: string, value: any): void {
    const obj = this.getObj(key);

    if (obj != null) {
      obj.value[attr] = value;
      this.set(key, obj.value);
    }
  }

  /**
   * 获取值
   *
   * @param key
   * @returns {*|$value|s}
   */
  get(key: string): any {
    const serializeObj = localStorage.getItem(key);

    if (serializeObj != null) {
      return JSON.parse(serializeObj).value;
    }

    return null;
  }

  /**
   * 获取值得完整信息
   *
   * @param key
   * @returns {any}
   */
  getObj(key: string): any {
    const serializeObj = localStorage.getItem(key);

    if (serializeObj != null) {
      return JSON.parse(serializeObj);
    }

    return null;
  }

  /**
   * 移除元素
   *
   * @param key
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 清空所有值
   */
  clear(): void {
    localStorage.clear();
  }
}

class SessionStorageCache {
  private static instance: SessionStorageCache; // 类型为这个类

  private constructor() {}

  static getInstance() {
    if (!SessionStorageCache.instance) {
      SessionStorageCache.instance = new SessionStorageCache();
    }
    return SessionStorageCache.instance;
  }

  /**
   * 设置值
   *
   * @param key
   * @param value
   */
  set(key: string, value: any): void {
    const serializeObj = {
      value,
      timestamp: new Date().getTime(),
    };

    sessionStorage.setItem(key, JSON.stringify(serializeObj));
  }

  /**
   * 属性变更
   * <br/>
   * 1.拓展属性（例如 timestamp 等）将会自动更新；
   * 2.仅在值为 json 类型时可使用，
   * 例如：
   * {
   *   key : info,
   *   value : {
   *     name : string,
   *     age : integer
   *   }
   * }，
   * 属性动态添加或修改可使用：
   * apply(key, attr, value)
   *
   * @param key
   * @param attr
   * @param value
   */
  apply(key: string, attr: string, value: any): void {
    const obj = this.getObj(key);

    if (obj != null) {
      obj.value[attr] = value;
      this.set(key, obj.value);
    }
  }

  /**
   * 获取值
   *
   * @param key
   * @returns {*|$value|s}
   */
  get(key: string): any {
    const serializeObj = sessionStorage.getItem(key);

    if (serializeObj != null) {
      return JSON.parse(serializeObj).value;
    }

    return null;
  }

  /**
   * 获取值得完整信息
   *
   * @param key
   * @returns {any}
   */
  getObj(key: string): any {
    const serializeObj = sessionStorage.getItem(key);

    if (serializeObj != null) {
      return JSON.parse(serializeObj);
    }

    return null;
  }

  /**
   * 移除元素
   *
   * @param key
   */
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * 清空所有值
   */
  clear(): void {
    sessionStorage.clear();
  }
}

export const LocalCache: LocalStorageCache = LocalStorageCache.getInstance();
export const SessionCache: SessionStorageCache = SessionStorageCache.getInstance();

export default {
  LocalCache,
  SessionCache,
};
