/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/shdf/': {
      // target: 'http://10.92.120.127:8877/',
      target: 'http://10.92.119.56:8877/',
      // target: 'http://192.168.137.46:8877/',
      // target: 'http://10.92.119.248:8877/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {},
  pre: {},
};
