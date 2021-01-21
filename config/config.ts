import routes from '../router';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  pwa: false,
  targets: {
    ie: 11,
  },
  publicPath: '/shdf-fbms/',
  base: '/shdf-fbms/',
  manifest: {
    basePath: '/shdf-fbms/',
  },
  routes,
  define: {
    // 开发环境下，且mock不为none，视为使用mock数据
    'process.env.USE_MOCK': process.env.MOCK !== 'none' && process.env.NODE_ENV === 'development',
  },
  // chainWebpack: webpackPlugin,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  esbuild: {},
});
