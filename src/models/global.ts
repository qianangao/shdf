import { message } from 'antd';
import {
  getDictionary,
  uploadFile,
  getDownloadFiles,
  deleteDownloadFiles,
} from '@/services/global';

import { LocalCache } from '@/utils/storage';

const ENUMS_CACHE_KEY = 'enums_cache_key';
const ENUMS_CACHE_TAMP_KEY = 'enums_cache_tamp_key';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    filesStatus: 1, // 导出中：0， 导出完成： 1
    downloadFiles: [],
    enums: LocalCache.get(ENUMS_CACHE_KEY) || {},
    enumsTimestamp: LocalCache.get(ENUMS_CACHE_TAMP_KEY) || {},
  },
  effects: {
    *getEnums({ payload }, { put }) {
      const { names } = payload;

      for (const dictTypeCode of names) {
        yield put({
          type: 'getEnum',
          payload: { dictTypeCode },
        });
      }
    },
    *getEnum({ payload }, { call, put, select }) {
      const { dictTypeCode } = payload;
      const enums = yield select(state => state.global.enums);
      const enumsTimestamp = yield select(state => state.global.enumsTimestamp);

      // 缺少参数
      if (!dictTypeCode) return;

      // 存在对应枚举，且为常量
      if (enums[dictTypeCode] && enumsTimestamp[dictTypeCode] === 0) return;

      // 存在对应枚举，且时效为5分钟内
      if (
        enums[dictTypeCode] &&
        new Date().getTime() - enumsTimestamp[dictTypeCode] < 60 * 1000 * 5
      )
        return;

      const response = yield call(getDictionary, payload);

      if (!response.error && response[0]) {
        const isCommon = response[0].dicType === 0; // dicType 0、系统运行性类 1、业务类
        const items = {};
        response.forEach(item => {
          items[item.dictCode] = item.dictName || '';
        });

        yield put({
          type: 'saveEnum',
          payload: {
            key: dictTypeCode,
            timestamp: isCommon ? 0 : new Date().getTime(),
            items,
          },
        });
      }
    },
    *uploadFile({ payload, resolve }, { call }) {
      const { file, type } = payload;

      if (type === 'image' && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
        message.warning('仅支持上传图片，请重新上传！（图片类型：gif,jpeg,jpg,png）');
        return;
      }

      if (type === 'excel' && !/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
        message.warning('仅支持上传excel文档，请重新上传！（文件类型：xlsx,xls）');
        return;
      }

      const formData = new FormData();
      formData.append('file', payload.file);

      const response = yield call(uploadFile, formData);

      if (!response.error) {
        resolve && resolve(response);
      } else {
        message.warning('上传文件失败，请重试！');
      }
    },
    *refreshDownloadFiles(_, { call, put }) {
      const response = yield call(getDownloadFiles);

      if (!response.error) {
        yield put({
          type: 'save',
          payload: {
            filesStatus: response.status,
            downloadFiles: response.downloadCenterDetailVos,
          },
        });
      } else {
        message.warning('获取下载文件列表失败！');
      }
    },
    *deleteDownloadFiles({ payload }, { call, put }) {
      const response = yield call(deleteDownloadFiles, payload);

      if (!response.error) {
        yield put({
          type: 'deleteDownLoadFiles',
          payload,
        });
        yield put({
          type: 'refreshDownloadFiles',
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveEnum(state, { payload }) {
      const enums = { ...state.enums, [payload.key]: payload.items };
      const enumsTimestamp = { ...state.enumsTimestamp, [payload.key]: payload.timestamp };

      LocalCache.get(ENUMS_CACHE_KEY) || LocalCache.set(ENUMS_CACHE_KEY, {});
      LocalCache.apply(ENUMS_CACHE_KEY, payload.key, payload.items);

      LocalCache.get(ENUMS_CACHE_TAMP_KEY) || LocalCache.set(ENUMS_CACHE_TAMP_KEY, {});
      LocalCache.apply(ENUMS_CACHE_TAMP_KEY, payload.key, payload.timestamp);

      return { ...state, enums, enumsTimestamp };
    },
    deleteDownLoadFiles(state, { payload }) {
      const ids = payload.ids || [];
      const downloadFiles = state.downloadFiles.filter(file => ids.indexOf(file.id) === -1);
      return { ...state, downloadFiles };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
  subscriptions: {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    setup({ history }) {
      // 浏览器历史日志相关逻辑
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      // history.listen(({ pathname, search }) => {
      //   if (typeof window.ga !== 'undefined') {
      //     window.ga('send', 'pageview', pathname + search);
      //   }
      // });
    },
  },
};
export default GlobalModel;
