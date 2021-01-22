const routes = {
  path: '/case-mgt',
  name: 'case-mgt',
  remark: '案件管理',
  routes: [
    {
      path: '/case-mgt',
      redirect: '/case-mgt/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;
