import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: '#bf291b',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: '全国“SHDF”SM信息管理系统',
  pwa: false,
  iconfontUrl: '',
  wsUrl: 'ws://10.92.119.160:8877',
  menu: {
    locale: true,
  },
  splitMenus: true,
};

export type { DefaultSettings };

export default proSettings;
