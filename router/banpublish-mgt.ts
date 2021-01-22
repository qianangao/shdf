const routes = {
  path: '/banpublish-mgt',
  name: 'banpublish-mgt',
  remark: '非法出版物鉴定',
  routes: [
    {
      path: '/banpublish-mgt',
      redirect: '/banpublish-mgt/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;
